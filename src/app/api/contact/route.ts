import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
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

export async function POST(request: NextRequest) {
  try {
    const { name, email, message }: ContactFormData = await request.json();

    const auth = await google.auth.getClient({
      projectId: credentials.project_id,
      credentials: {
        type: "service_account",
        private_key: credentials.private_key,
        client_email: credentials.client_email,
        client_id: credentials.client_id,
        token_url: credentials.token_uri,
        universe_domain: "googleapis.com",
      },
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Agregar nueva fila con los datos del formulario
    const values = [[
      new Date().toISOString(), // Fecha
      name,                     // Nombre
      email,                    // Email
      message,                  // Mensaje
      'Nuevo',                 // Estado
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
      message: 'Mensaje enviado correctamente' 
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error al enviar el mensaje' 
    }, { status: 500 });
  }
}
