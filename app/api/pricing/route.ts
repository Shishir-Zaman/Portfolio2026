import { NextResponse } from "next/server";
import { getPricingPackages, savePricingPackages } from "../../../lib/db";
import { auth } from "../../../auth";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const packages = await getPricingPackages();
    return NextResponse.json(packages);
  } catch (error) {
    console.error("Failed to fetch pricing packages:", error);
    return NextResponse.json({ error: "Failed to fetch pricing packages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const packages = await request.json();
    await savePricingPackages(packages);
    
    // Revalidate the pricing page so the changes show up immediately
    revalidatePath("/pricing");
    revalidatePath("/", "layout");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save pricing packages:", error);
    return NextResponse.json({ error: "Failed to save pricing packages" }, { status: 500 });
  }
}
