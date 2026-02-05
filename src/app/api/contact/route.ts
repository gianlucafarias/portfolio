import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  website?: string;
  formStart?: number;
}

const credentials = {
  type: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE,
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY,
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: process.env.GOOGLE_AUTH_URI,
  token_uri: process.env.GOOGLE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN
};

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 1000;
const MIN_MESSAGE_LENGTH = 10;
const MIN_HUMAN_TIME_MS = 1500;
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_IP = 5;

let cachedSheets: ReturnType<typeof google.sheets> | null = null;
const rateLimitMap = new Map<string, number[]>();

async function getSheetsClient() {
  if (cachedSheets) return cachedSheets;

  const privateKey = credentials.private_key?.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  cachedSheets = google.sheets({ version: "v4", auth });
  return cachedSheets;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function invalidResponse(message: string) {
  return NextResponse.json({ success: false, message }, { status: 400 });
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const existing = rateLimitMap.get(ip) || [];
  const recent = existing.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_IP) {
    rateLimitMap.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const origin = request.headers.get("origin") || "";
    const referer = request.headers.get("referer") || "";
    if (origin && !origin.startsWith(siteUrl)) {
      return NextResponse.json({ success: false, message: "Origen invalido." }, { status: 403 });
    }
    if (!origin && referer && !referer.startsWith(siteUrl)) {
      return NextResponse.json({ success: false, message: "Origen invalido." }, { status: 403 });
    }

    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json({ success: false, message: "Demasiadas solicitudes." }, { status: 429 });
    }

    const { name, email, message, website, formStart }: ContactFormData = await request.json();
    const safeName = name?.trim() || "";
    const safeEmail = email?.trim() || "";
    const safeMessage = message?.trim() || "";

    if (website && website.trim().length > 0) {
      return invalidResponse("Mensaje no valido.");
    }

    if (!Number.isFinite(formStart)) {
      return invalidResponse("Mensaje no valido.");
    }

    const elapsed = Date.now() - Number(formStart);
    if (elapsed < MIN_HUMAN_TIME_MS) {
      return invalidResponse("Mensaje no valido.");
    }

    if (!safeName || !safeEmail || !safeMessage) {
      return invalidResponse("Completa todos los campos.");
    }

    if (
      safeName.length > MAX_NAME_LENGTH ||
      safeEmail.length > MAX_EMAIL_LENGTH ||
      safeMessage.length > MAX_MESSAGE_LENGTH
    ) {
      return invalidResponse("El mensaje supera el maximo permitido.");
    }

    if (safeMessage.length < MIN_MESSAGE_LENGTH) {
      return invalidResponse("El mensaje es demasiado corto.");
    }

    if (!isValidEmail(safeEmail)) {
      return invalidResponse("Ingresa un email valido.");
    }

    const sheets = await getSheetsClient();

    // Agregar nueva fila con los datos del formulario
    const values = [[
      new Date().toISOString(), // Fecha
      safeName,                 // Nombre
      safeEmail,                // Email
      safeMessage,              // Mensaje
      "Nuevo",                 // Estado
      new Date().toISOString() // Timestamp
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
      range: "Sheet1!A:F",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: values
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Mensaje enviado correctamente" 
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Error al enviar el mensaje" 
    }, { status: 500 });
  }
}
