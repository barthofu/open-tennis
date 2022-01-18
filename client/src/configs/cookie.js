const cookieConfig = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60,
    sameSite: 'lax',
    path: '/'
}

export default cookieConfig