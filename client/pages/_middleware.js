import { NextResponse } from 'next/server'
import { ignoredPaths } from '@configs/protection'

export default function middleware (req) {

    const { token } = req.cookies
    const isIgnoredPath = ignoredPaths.filter(ignoredPath => req.url.startsWith(ignoredPath)).length > 0

    if (token || isIgnoredPath) return NextResponse.next()
    else return NextResponse.redirect('/auth/login')
}