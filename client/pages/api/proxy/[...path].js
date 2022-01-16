import Cookies from 'cookies'
import url from 'url'
import axios from 'axios'
import cookie from 'cookie'

export const config = {
	api: {
		bodyParser: true,
	}
}

export default async function handler (req, res) {

	const headers = {}
	const pathname = url.parse(req.url).pathname
	const isLogin = pathname === '/api/proxy/login'

	console.log(req.cookies)
	const token = null

	// re-écriture de l'URL
	let path = req.url.replace(/^\/proxy/, '')
	if (isLogin) path = '/auth/login'

	// on définit le header d'autorisation
	if (token) {
		headers['Authorization'] = `Bearer ${token}`
	}

	try {

		const apiResponse = await axios({
			url: path,
			baseURL: 'https://cpoa.api.barthofu.com',
			method: req.method,
			data: req.body,
			params: req.query,
			headers,
			withCredentials: true
		})
		
		if (!isLogin) return res.json(apiResponse)

		// login

		const { token, refresh_token } = apiResponse.data

		console.log(token)

		res.setHeader(
			'Set-Cookie',
			cookie.serialize('token', token, {
				// httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				maxAge: 60 * 60,
				sameSite: 'lax',
				path: '/'
			})
		)
		// cookies.set('token', 		 token, 		{ httpOnly: true, sameSite: 'lax', path: '/' })
		// cookies.set('refresh_token', refresh_token, { httpOnly: true, sameSite: 'lax', path: '/' })

		res.statusCode = 200
		res.json({ loggedIn: true })

	} catch (err) {
		console.error(err)
		return res.json(err)
	}
	
}