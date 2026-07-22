import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { getSeoSettings, saveSeoSettings } from "../../../../lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getSeoSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch SEO settings:", error);
    return NextResponse.json({ error: "Failed to fetch SEO settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await request.json();
    await saveSeoSettings(settings);

    // Revalidate the entire layout so tracking scripts update
    revalidatePath("/", "layout");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save SEO settings:", error);
    return NextResponse.json({ error: "Failed to save SEO settings" }, { status: 500 });
  }
}
