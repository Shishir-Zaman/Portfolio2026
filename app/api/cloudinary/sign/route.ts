import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";
import { auth } from "../../../../auth";

// SECURITY: This endpoint generates Cloudinary upload signatures using the
// server-side API secret. It MUST be protected by auth — anyone who can call
// this can upload arbitrary files to the Cloudinary account.
export async function POST(request: Request) {
  try {
    // Verify the caller is an authenticated admin session
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { paramsToSign } = body;

    if (!paramsToSign || typeof paramsToSign !== "object") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({ 
      signature, 
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME
    });
  } catch (error) {
    console.error("Cloudinary sign error:", error);
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500 }
    );
  }
}
