import httpProxy from 'http-proxy'
import Cookies from 'cookies'
import url from 'url'

const proxy = httpProxy.createProxyServer()

export const config = {
	api: {
		bodyParser: false,
	}
}

export default function (req, res) {

	return new Promise((resolve, reject) => {

		const pathname = url.parse(req.url).pathname
		const isLogin = pathname === '/api/proxy/login'

		const cookies = new Cookies(req, res)
		const token = cookies.get('token')

		// re-écriture de l'URL
        if (isLogin) req.url = '/auth/login'
		else req.url = req.url.replace(/^\/proxy/, '')

		// on enlève les cookies car inutiles
		req.headers.cookie = ''

		// on définit le header d'autorisation
		if (token) {
			req.headers['Authorization'] = `Bearer ${token}`
		}

		proxy
			.once('proxyRes', (proxyRes, req, res) => {
                
				if (isLogin) {

					let responseBody = ''
					proxyRes.on('data', (chunk) => {
						console.log(chunk)
						console.log(chunk.toString('UTF8'))
						responseBody += chunk
					})

					proxyRes.on('end', () => {
                        
						try {
                            const { token } = JSON.parse(responseBody)
							const cookies = new Cookies(req, res)
							cookies.set('token', token, {
								httpOnly: true,
								sameSite: 'lax', // CSRF protection
							})

							res.status(200).json({ loggedIn: true })
							resolve()
						} catch (err) {
							reject(err)
						}
					})
				} else {
					resolve()
				}
			})
			.once('error', reject)
			.web(req, res, {
				target: 'https://cpoa.api.barthofu.com',
				autoRewrite: false,
				selfHandleResponse: isLogin,
			})
	})
}