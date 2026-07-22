import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import { getServices, saveServices } from "../../../lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getServices();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    await saveServices(data);

    // Revalidate paths
    revalidatePath("/", "layout");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save services:", error);
    return NextResponse.json({ error: "Failed to save services" }, { status: 500 });
  }
}
