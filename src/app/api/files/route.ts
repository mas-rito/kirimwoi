import { NextRequest, NextResponse } from "next/server"

import { retrieveData, retrieveDataById } from "@/lib/firebase/services"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const email = searchParams.get("email")

  if (id) {
    const singleData = await retrieveDataById("files", id)
    if (singleData) {
      return NextResponse.json({
        status: 200,
        message: "Successfully",
        data: singleData,
      })
    } else {
      return NextResponse.json({
        status: 404,
        message: "Not found",
        data: {},
      })
    }
  }
  if (email) {
    const filesByUser = await retrieveData("files", email)

    return NextResponse.json({
      status: 200,
      message: "Successfully",
      data: filesByUser,
    })
  }
}
