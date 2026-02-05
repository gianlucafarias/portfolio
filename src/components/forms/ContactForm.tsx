"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormData {
  name: string;
  email: string;
  message: string;
  website: string;
}

interface SubmitStatus {
  type: "success" | "error";
  message: string;
}

interface ContactMessages {
  form?: {
    name?: string;
    email?: string;
    message?: string;
    send?: string;
  };
  messages?: {
    sending?: string;
    error?: string;
  };
}

export default function ContactForm() {
  const { messages } = useLanguage();
  const contactMessages = messages?.contact as ContactMessages | undefined;
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [formStart] = useState(() => Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const name = formData.name.trim();
      const email = formData.email.trim();
      const message = formData.message.trim();

      if (!name || !email || !message) {
        setSubmitStatus({
          type: "error",
          message: contactMessages?.messages?.error || "Completa todos los campos",
        });
        setIsSubmitting(false);
        return;
      }

      if (name.length > 80 || email.length > 120 || message.length > 1000) {
        setSubmitStatus({
          type: "error",
          message: contactMessages?.messages?.error || "El mensaje supera el maximo permitido",
        });
        setIsSubmitting(false);
        return;
      }

      if (message.length < 10) {
        setSubmitStatus({
          type: "error",
          message: contactMessages?.messages?.error || "El mensaje es demasiado corto",
        });
        setIsSubmitting(false);
        return;
      }

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        setSubmitStatus({
          type: "error",
          message: contactMessages?.messages?.error || "Ingresa un email valido",
        });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          website: formData.website,
          formStart,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message,
        });
        setFormData({ name: "", email: "", message: "", website: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message,
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message:
          contactMessages?.messages?.error || "Error al enviar el mensaje",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
          {contactMessages?.form?.name || "Nombre"}
        </label>
        <input
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          maxLength={80}
          autoComplete="name"
          placeholder={contactMessages?.form?.name || "Tu nombre"}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
          {contactMessages?.form?.email || "Email"}
        </label>
        <input
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          maxLength={120}
          inputMode="email"
          autoComplete="email"
          placeholder={contactMessages?.form?.email || "tu@email.com"}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
          {contactMessages?.form?.message || "Mensaje"}
        </label>
        <textarea
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-orange-400 dark:focus:ring-orange-400"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          minLength={10}
          maxLength={1000}
          rows={4}
          placeholder={contactMessages?.form?.message || "Tu mensaje..."}
        />
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus-visible:outline-orange-400"
      >
        {isSubmitting
          ? contactMessages?.messages?.sending || "Enviando..."
          : contactMessages?.form?.send || "Enviar"}
      </button>
      {submitStatus && (
        <div
          className={`rounded-xl border p-4 ${
            submitStatus.type === "success"
              ? "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/50 dark:text-green-200"
              : "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-200"
          }`}
          aria-live="polite"
        >
          {submitStatus.message}
        </div>
      )}
    </form>
  );
}
