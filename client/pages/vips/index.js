import Default from '@layouts/Default/Default'
import Vips from '@templates/Vips/Vips'

import cookieCutter from 'cookie-cutter'
import axios from 'axios'
import * as cookie from 'cookie'

export default function VipsPage ({ vips }) {

    return (
        // <Default>
            <Vips vips={vips}/>
        // </Default>
    )
}

export async function getServerSideProps (ctx) {

    // fetch('http://127.0.0.1:3000/api/proxy/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         username: 'bartho',
    //         password: '123'
    //     })
    // })
    const res = await axios({
        url: '/api/proxy/login',
        baseURL: 'http://127.0.0.1:3000/',
        method: 'POST',
        data: {
            username: 'bartho',
            password: '123'
        }
    })
    console.log(res.data)

    // const vips = await axios({
    //     url: '/api/vips',
    //     method: 'GET',
    //     headers: { 'Authorization': `Bearer ${cookie.parse(ctx.req.headers.cookie).token }`}
    // }).catch(console.error)

    return {
        props: {
            vips: []//vips.data['hydra:member']
        }
    }
}