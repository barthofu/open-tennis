import Default from '@layouts/Default/Default'
import Vips from '@templates/Vips/Vips'

import axios from '@utils/axios'

export default function VipsPage ({ vips }) {

    return (
        // <Default>
            <Vips vips={vips}/>
        // </Default>
    )
}

export async function getServerSideProps ({ req }) {

    const res = await axios.get('/proxy/vips', { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
    if (!res?.data['hydra:member']) return { redirect: { destination: '/auth/login' } }

    return {
        props: {
            vips: res.data['hydra:member']
        }
    }
}