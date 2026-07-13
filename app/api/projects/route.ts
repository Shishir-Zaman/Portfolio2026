import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import { getProjects, saveProjects } from "../../../lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await request.json();
    
    // Validate it's an array
    if (!Array.isArray(projects)) {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    await saveProjects(projects);
    
    // Revalidate the frontend paths that use projects
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/sitemap.xml"); // The sitemap generator uses getProjects now or in the future
    
    // Also revalidate all individual project slugs in the background by revalidating the layout
    // Alternatively, revalidatePath("/projects/[slug]", "page") can be called dynamically per project,
    // but revalidatePath("/projects", "layout") revalidates all pages under /projects
    revalidatePath("/projects", "layout");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save projects:", error);
    return NextResponse.json({ error: "Failed to save projects" }, { status: 500 });
  }
}
