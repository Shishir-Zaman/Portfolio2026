import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import { getHomePageSettings, saveHomePageSettings } from "../../../lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getHomePageSettings();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch home page settings:", error);
    return NextResponse.json({ error: "Failed to fetch home page settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    await saveHomePageSettings(data);

    // Revalidate the home page
    revalidatePath("/", "layout");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save home page settings:", error);
    return NextResponse.json({ error: "Failed to save home page settings" }, { status: 500 });
  }
}
