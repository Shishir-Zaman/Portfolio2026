import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "../../data/content";
import { ProjectPageClient } from "./ProjectPageClient";

const BASE_URL = "https://shishirzaman.vercel.app";

// ─── Static generation ──────────────────────────────────────
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

// ─── Per-project metadata ────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const title = `${project.title} — ${project.tags[0]} Case Study`;
  const description =
    project.description ||
    `${project.title} — a ${project.tags.join(", ")} project by Shishir Zaman, visual & brand designer based in Dhaka, Bangladesh.`;
  const url = `${BASE_URL}/projects/${project.id}`;

  return {
    title: project.title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.title} — project by Shishir Zaman`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image],
    },
    alternates: {
      canonical: url,
    },
  };
}

// ─── Page (Server Component) ─────────────────────────────────
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) return notFound();

  // CreativeWork structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description:
      project.description ||
      `${project.title} — a ${project.tags.join(", ")} project.`,
    image: project.image,
    url: `${BASE_URL}/projects/${project.id}`,
    dateCreated: project.year ?? "2024",
    creator: {
      "@type": "Person",
      name: "Shishir Zaman",
      url: BASE_URL,
    },
    keywords: project.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectPageClient project={project} />
    </>
  );
}
