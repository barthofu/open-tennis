import Vip from '@templates/Vip/Vip'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import axios from "@utils/axios"

Modal.setAppElement('#__next')

const customModalStyles = {

    content: {

    }
}

export default function VipPage ({ vip }) {

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
            style={customModalStyles}
        >
            <i className={`closeModalButton fas fa-times`} onClick={onModalClose}></i>
            {/* <button className="modalButton" onClick={onModalClose}>X</button> */}
            <Vip vip={vip}></Vip>
        </Modal>

    </>)
}

export async function getServerSideProps ({ req, params: { id } }) {

    const res = await axios.get(`/proxy/vips/${id}`, { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
    if (!res?.data['id']) return { redirect: { destination: '/auth/login' } }

    return {
        props: {
            vip: res.data
        }
    }
}