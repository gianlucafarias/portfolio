"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormData {
  name: string;
  email: string;
  message: string;
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message,
        });
        setFormData({ name: "", email: "", message: "" });
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
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-50 dark:focus:ring-zinc-50"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={contactMessages?.form?.name || "Tu nombre"}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
          {contactMessages?.form?.email || "Email"}
        </label>
        <input
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-50 dark:focus:ring-zinc-50"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={contactMessages?.form?.email || "tu@email.com"}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
          {contactMessages?.form?.message || "Mensaje"}
        </label>
        <textarea
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-50 dark:focus:ring-zinc-50"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder={contactMessages?.form?.message || "Tu mensaje..."}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
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
        >
          {submitStatus.message}
        </div>
      )}
    </form>
  );
}
