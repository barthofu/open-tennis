import Vip from '@templates/Vip/Vip'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import axios from "@utils/axios"

Modal.setAppElement('#__next')

export default function VipPage ({ vip }) {

    const router = useRouter()

    useEffect(() => {
        router.prefetch('/dashboard/vips/')
    })

    return (<>

        <Modal
            isOpen={true}
            onRequestClose={() => router.push('/dashboard/vips', undefined, { shallow: true })}
            contentLabel='Vip'
            ariaHideApp={false}
        >
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