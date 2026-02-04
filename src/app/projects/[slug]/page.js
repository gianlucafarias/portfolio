import CaseStudyPage from "@/components/pages/CaseStudyPage";

const SLUGS = [
  "mentesana",
  "la-max-stream",
  "incubadora-noc",
  "arquitrack",
  "ceresito",
  "encuesta-plan-obras",
  "club-central",
];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const messages = (await import("@/messages/es.json")).default;
  const all = [
    ...(messages?.projects?.pinProjects || []),
    ...(messages?.projects?.otherProjects || []),
  ];
  const project = all.find((p) => p.slug === slug);
  if (!project) return { title: "Proyecto no encontrado" };
  return {
    title: `${project.title} | Case Study`,
    description: project.shortDescription || project.description?.slice(0, 160),
  };
}

export default async function ProjectCaseStudyPage({ params }) {
  const { slug } = await params;
  return <CaseStudyPage slug={slug} />;
}
