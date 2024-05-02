import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  return res
}
