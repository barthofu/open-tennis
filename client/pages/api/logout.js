import cookie from "cookie"
import cookieConfig from '@configs/cookie'

export default function handler (req, res) {

    cookieConfig.maxAge = new Date(0)

    res.setHeader('Set-Cookie', [
        cookie.serialize('token', '', cookieConfig),
        cookie.serialize('refresh_token', '', cookieConfig)
    ])

    res.redirect('/auth/login')
}