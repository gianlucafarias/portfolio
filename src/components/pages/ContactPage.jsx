"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";
import ContactForm from "@/components/forms/ContactForm";

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const TRANSITION_SECTION = {
  duration: 0.3,
};

export default function ContactPage() {
  const { messages, isEnglish } = useLanguage();

  const contactTitle = messages?.nav?.contact || "Contacto";
  const contactDescription = messages?.contact?.description ||
    (isEnglish
      ? "Have a project in mind? Send me a message and I'll get back to you right away."
      : "¿Tenés un proyecto en mente? Enviame un mensaje y te respondo al toque.");

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
        <h3 className="mb-5 text-lg font-medium">{contactTitle}</h3>
        <p className="mb-6 text-zinc-600 dark:text-zinc-400">
          {contactDescription}
        </p>
        <div className="rounded-2xl border border-zinc-200/50 bg-zinc-50/40 p-6 ring-1 ring-zinc-200/50 ring-inset dark:border-zinc-800/50 dark:bg-zinc-950/40 dark:ring-zinc-800/50">
          <ContactForm />
        </div>
      </motion.section>
    </motion.main>
  );
}
