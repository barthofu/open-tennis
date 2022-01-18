import { useRouter } from "next/router"
import Vip from '@templates/Vip/Vip'

import axios from "@utils/axios"

export default function VipPage ({ vip }) {

    return (
        <Vip vip={vip} />
    )
}

export async function getServerSideProps ({ req, params: { id } }) {

    const res = await axios.get(`/proxy/vips/${id}`, { headers: { 'cookie': req.headers.cookie } }).catch(console.error)

    return {
        props: {
            vip: res.data
        }
    }
}