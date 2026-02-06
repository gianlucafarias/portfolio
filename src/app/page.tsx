import HomePageClient from "@/components/pages/HomePageClient";
import { getProjectsByLocale } from "@/lib/projects-sheet";

export const dynamic = "force-static";

export default async function HomePage() {
  const [{ pinProjects: pinProjectsEs }, { pinProjects: pinProjectsEn }] =
    await Promise.all([
      getProjectsByLocale("es"),
      getProjectsByLocale("en"),
    ]);

  return (
    <HomePageClient
      pinProjectsEs={pinProjectsEs}
      pinProjectsEn={pinProjectsEn}
    />
  );
}
