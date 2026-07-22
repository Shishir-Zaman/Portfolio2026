import { NextResponse } from "next/server";
import { getBrandLogos, saveBrandLogos } from "../../../lib/db";
import { auth } from "../../../auth";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const logos = await getBrandLogos();
    return NextResponse.json(logos);
  } catch (error) {
    console.error("Failed to fetch brand logos:", error);
    return NextResponse.json({ error: "Failed to fetch brand logos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const logos = await request.json();
    await saveBrandLogos(logos);

    // Revalidate the pricing page so brand carousel updates immediately
    revalidatePath("/pricing");
    revalidatePath("/", "layout");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save brand logos:", error);
    return NextResponse.json({ error: "Failed to save brand logos" }, { status: 500 });
  }
}
