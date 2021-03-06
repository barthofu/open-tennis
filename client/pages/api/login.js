import axios from 'axios'
import cookie from 'cookie'
import { apiURL } from '@configs/connections'
import cookieConfig from '@configs/cookie'
 
export const config = {
	api: {
		bodyParser: true,
	}
}

export default async function handler (req, res) {

    const { username, password } = req.body

    axios({
        url: '/auth/login',
        baseURL: apiURL,
        method: 'POST',
        data: {
            username,
            password
        }
    })
    .then(apiResponse => {

        const { token, refresh_token } = apiResponse.data

        axios({
            url: '/api/me',
            baseURL: apiURL,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(apiResponse => {

            res.setHeader('Set-Cookie', [
                cookie.serialize('token', token, cookieConfig),
                cookie.serialize('refresh_token', refresh_token, cookieConfig),
                cookie.serialize('responsable_id', apiResponse.data['@id'], cookieConfig)
            ])
        })
        .catch(err => {
            res.setHeader('Set-Cookie', [
                cookie.serialize('token', token, cookieConfig),
                cookie.serialize('refresh_token', refresh_token, cookieConfig)
            ])
        })
        .finally(() => {

            res.status(200)
            res.json({ isLogged: true })
        })
    })
    .catch(e => {

        //console.log(e?.response?.data)
        const status = e.toJSON().status

        res.status(status)
        res.json({ isLogged: false })
    })
}