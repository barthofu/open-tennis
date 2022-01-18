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

	const headers = {},
		  { token } = req.cookies
		  
	// re-écriture de l'URL
	const url = req.url.replace('proxy/', '')

	// on définit le header d'autorisation
	if (token) {
		headers['Authorization'] = `Bearer ${token}`
	}

	try {

		const apiResponse = await axios({
			url,
			baseURL: apiURL,
			method: req.method,
			data: req.body,
			params: req.query,
			headers,
			//withCredentials: true
		})
		
		return res.json(JSON.stringify(apiResponse.data))

	} catch (err) {

		//TODO: gérer le refresh du token

		const status = err.toJSON()?.status

		if (status === 401) {

			res.redirect('/api/logout')
			// // refresh le token
			// const { refresh_token } = req.cookies

			// if (refresh_token) {

			// 	const { data } = await axios({
			// 		url: '/api/token/refresh',
			// 		baseURL: apiURL,
			// 		method: 'POST',
			// 		data: { refresh_token }
			// 	})

			// 	if (data?.token) {
					
			// 		// on ajoute le nouveau token au cookie
			// 		const serializedCookie = cookie.serialize('token', data.token, cookieConfig)
			// 		res.setHeader('Set-Cookie', serializedCookie)
			// 		req.headers.cookie = serializedCookie

			// 		// on retente la requête
			// 		return handler(req, res)
					
			// 	} else {
			// 		// on supprime le refresh_token
			// 		res.redirect('/api/logout')
			// 	}
			//}
		}

		return res.json(err.toJSON())
	}
	
}