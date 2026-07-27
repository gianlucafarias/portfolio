import { Metadata } from "next";
import HomePageClient from "@/components/pages/HomePageClient";
import { getMessages } from "@/lib/i18n";
import { getProjectsByLocale } from "@/lib/projects-sheet";

const messages = getMessages("en");
const seo = messages?.seo as {
  title?: string;
  description?: string;
  keywords?: string;
} | undefined;
const socialImage = {
  url: "/profile.jpg",
  width: 919,
  height: 919,
  alt: "Gianluca Palmier",
};

export const metadata: Metadata = {
  title: seo?.title || "Portfolio",
  description: seo?.description,
  keywords: seo?.keywords,
  alternates: {
    canonical: "/en",
    languages: {
      es: "/",
    },
  },
  openGraph: {
    title: seo?.title || "Portfolio",
    description: seo?.description,
    url: "/en",
    siteName: "Gianluca Palmier",
    locale: "en_US",
    type: "website",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: seo?.title || "Portfolio",
    description: seo?.description,
    images: [socialImage.url],
  },
};

export default async function HomePageEn() {
  const { pinProjects } = await getProjectsByLocale("en");
  return <HomePageClient locale="en" messages={messages} pinProjects={pinProjects} />;
}
