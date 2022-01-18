
export function verifyToken (req) {
    
    const { token } = req.cookies


    if (token || isIgnoredPath) return NextResponse.next()
    else return NextResponse.redirect('/auth/login')
}