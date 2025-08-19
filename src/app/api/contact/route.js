import { google } from "googleapis";
import keys from "../../../../spreadsheet-keys.json";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    const auth = await google.auth.getClient({
      projectId: keys.project_id,
      credentials: {
        type: "service_account",
        private_key: keys.private_key,
        client_email: keys.client_email,
        client_id: keys.client_id,
        token_url: keys.token_uri,
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
      resource: {
        values: values
      }
    });

    return Response.json({ 
      success: true, 
      message: 'Mensaje enviado correctamente' 
    });

  } catch (error) {
    console.error('Error:', error);
    return Response.json({ 
      success: false, 
      message: 'Error al enviar el mensaje' 
    }, { status: 500 });
  }
}
