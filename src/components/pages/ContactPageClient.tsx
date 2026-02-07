"use client";

import { motion } from "motion/react";
import ContactForm from "@/components/forms/ContactForm";
import type { Locale, Messages } from "@/lib/i18n";

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const TRANSITION_SECTION = {
  duration: 0.3,
};

interface ContactPageClientProps {
  locale: Locale;
  messages: Messages;
}

export default function ContactPageClient({ locale, messages }: ContactPageClientProps) {
  const isEnglish = locale === "en";

  const navMessages = messages?.nav as { contact?: string } | undefined;
  const contactMessages = messages?.contact as { description?: string } | undefined;

  const contactTitle = navMessages?.contact || "Contacto";
  const contactDescription = contactMessages?.description ||
    (isEnglish
      ? "Have a project in mind? Send me a message and I'll get back to you right away."
      : "¿Tenés un proyecto en mente? Envíame un mensaje y te respondo al toque.");

  return (
    <motion.main
      className="space-y-24"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        },
      }}
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-xl font-medium">{contactTitle}</h3>
        <p className="mb-6 text-base text-zinc-600 dark:text-zinc-300">
          {contactDescription}
        </p>
        <div className="rounded-2xl border border-zinc-200/50 p-6 dark:border-zinc-800/50">
          <ContactForm />
        </div>
      </motion.section>
    </motion.main>
  );
}
