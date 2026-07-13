import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import { getCategories, saveCategories } from "../../../lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const categories = await request.json();
    
    // Validate it's an array
    if (!Array.isArray(categories)) {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    await saveCategories(categories);
    
    // Revalidate the frontend paths that use categories
    revalidatePath("/");
    revalidatePath("/projects");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save categories:", error);
    return NextResponse.json({ error: "Failed to save categories" }, { status: 500 });
  }
}
