import { useRouter } from "next/router"
import Vip from '@templates/Vip/Vip'

import axios from "@utils/axios"

export default function VipPage ({ vip }) {

    return (
        <Vip vip={vip} />
    )
}

export async function getServerSideProps ({ params: { id } }) {

    const vip = await axios(`/api/vips/${id}`)

    return {
        props: {
            vip: vip.data
        }
    }
}