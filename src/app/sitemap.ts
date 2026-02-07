import { MetadataRoute } from "next";
import { PROJECT_SLUGS } from "@/lib/projects";

const DEFAULT_SITE_URL = "https://gianluca.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  const lastModified = new Date();

  const staticRoutes = [
    "/",
    "/en",
    "/projects",
    "/en/projects",
    "/contact",
    "/en/contact",
  ];

  const projectRoutes = PROJECT_SLUGS.flatMap((slug) => [
    `/projects/${slug}`,
    `/en/projects/${slug}`,
  ]);

  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
  }));
}
