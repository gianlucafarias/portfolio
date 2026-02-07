import { Metadata } from "next";
import ContactPageClient from "@/components/pages/ContactPageClient";
import { getMessages } from "@/lib/i18n";

const messages = getMessages("es");

export const metadata: Metadata = {
  title: `Contacto | ${(messages?.seo as { title?: string })?.title || "Portfolio"}`,
  description: (messages?.contact as { description?: string })?.description
    || (messages?.seo as { description?: string })?.description,
  alternates: {
    canonical: "/contact",
    languages: {
      en: "/en/contact",
    },
  },
  openGraph: {
    title: `Contacto | ${(messages?.seo as { title?: string })?.title || "Portfolio"}`,
    description: (messages?.contact as { description?: string })?.description
      || (messages?.seo as { description?: string })?.description,
    url: "/contact",
    siteName: "Gianluca Palmier",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contacto | ${(messages?.seo as { title?: string })?.title || "Portfolio"}`,
    description: (messages?.contact as { description?: string })?.description
      || (messages?.seo as { description?: string })?.description,
  },
};

export default function ContactPage() {
  return <ContactPageClient locale="es" messages={messages} />;
}
