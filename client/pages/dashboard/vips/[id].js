import Vip from '@templates/Vip/Vip'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import axios from "@utils/axios"

Modal.setAppElement('#__next')

export default function VipPage ({ vip, responsableId }) {

    const router = useRouter()

    useEffect(() => {
        router.prefetch('/dashboard/vips/')
    })

    const onModalClose = () => router.push('/dashboard/vips', undefined, { shallow: true })

    return (<>

        <Modal
            isOpen={true}
            onRequestClose={onModalClose}
            contentLabel='Vip'
            ariaHideApp={true}
        >
            <i className={`closeModalButton fas fa-times`} onClick={onModalClose}></i>
            {/* <button className="modalButton" onClick={onModalClose}>X</button> */}
            <Vip vip={vip} responsableId={responsableId}></Vip>
        </Modal>

    </>)
}

export async function getServerSideProps ({ req, params: { id } }) {

    const res = await axios.get(`/proxy/vips/${id}`, { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
    if (!res?.data['id']) return { redirect: { destination: '/auth/login' } }

    // fetch vips relations
    if (res.data['@type'] === 'Accompagnant') {
        const resAccompagne = await axios.get(`/proxy/joueurs/${res.data.accompagne.split('/').slice(-1)}`, { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
        if (resAccompagne?.data['id']) res.data.accompagne = resAccompagne.data
        else res.data.accompagne = null
    }
    else if (res.data['@type'] === 'Joueur') {
        const accompagnants = res.data.accompagnants.map(accompagnant => accompagnant.split('/').slice(-1)[0])
        res.data.accompagnants = []
        for (const accompagnant of accompagnants) {
            const resAccompagnant = await axios.get(`/proxy/accompagnants/${accompagnant}`, { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
            if (resAccompagnant?.data['id']) res.data.accompagnants.push(resAccompagnant.data)
        }
    }

    // fetch suivis
    const suivis = res.data.suivis.map(suivi => suivi.split('/').slice(-1)[0])
    res.data.suivis = []
    for (const suivi of suivis) {
        const resSuivi = await axios.get(`/proxy/suivis/${suivi}`, { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
        if (resSuivi?.data['id']) res.data.suivis.push(resSuivi.data)
    }

    return {
        props: {
            vip: res.data,
            responsableId: req.cookies.responsable_id
        }
    }
}