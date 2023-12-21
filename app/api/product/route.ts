import { retrieveDataById } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const singleData = await retrieveDataById("files", id);
    if (singleData) {
      return NextResponse.json({
        status: 200,
        message: "Successfully",
        data: singleData,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "Not found",
        data: {},
      });
    }
  }
}
