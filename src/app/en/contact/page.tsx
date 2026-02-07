import { Metadata } from "next";
import ContactPageClient from "@/components/pages/ContactPageClient";
import { getMessages } from "@/lib/i18n";

const messages = getMessages("en");

export const metadata: Metadata = {
  title: `Contact | ${(messages?.seo as { title?: string })?.title || "Portfolio"}`,
  description: (messages?.contact as { description?: string })?.description
    || (messages?.seo as { description?: string })?.description,
  alternates: {
    canonical: "/en/contact",
    languages: {
      es: "/contact",
    },
  },
  openGraph: {
    title: `Contact | ${(messages?.seo as { title?: string })?.title || "Portfolio"}`,
    description: (messages?.contact as { description?: string })?.description
      || (messages?.seo as { description?: string })?.description,
    url: "/en/contact",
    siteName: "Gianluca Palmier",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${(messages?.seo as { title?: string })?.title || "Portfolio"}`,
    description: (messages?.contact as { description?: string })?.description
      || (messages?.seo as { description?: string })?.description,
  },
};

export default function ContactPageEn() {
  return <ContactPageClient locale="en" messages={messages} />;
}
