import { NextRequest, NextResponse } from "next/server"

import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url))
  } else {
    return res
  }
}

export const config = {
  matcher: ["/upload", "/files/:path*"],
}
