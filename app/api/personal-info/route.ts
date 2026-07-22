import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import { getPersonalInfo, savePersonalInfo } from "../../../lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getPersonalInfo();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch personal info:", error);
    return NextResponse.json({ error: "Failed to fetch personal info" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    await savePersonalInfo(data);

    // Revalidate paths that use personal info
    revalidatePath("/", "layout");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save personal info:", error);
    return NextResponse.json({ error: "Failed to save personal info" }, { status: 500 });
  }
}
