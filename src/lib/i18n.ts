import esMessages from "@/messages/es.json";
import enMessages from "@/messages/en.json";
import { cache } from "react";

export type Locale = "es" | "en";
export type Messages = typeof esMessages;

export const getMessages = cache((locale: Locale): Messages => {
  return locale === "en" ? enMessages : esMessages;
});
