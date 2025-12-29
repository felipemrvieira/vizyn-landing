import { NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";

type LeadPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  source?: string;

  // honeypot anti-spam
  company?: string;
};

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function parseServiceAccountJson(raw: string) {
  let s = raw.trim();

  // common Vercel mistake: env value saved with wrapping quotes
  if (
    (s.startsWith("'") && s.endsWith("'")) ||
    (s.startsWith('"') && s.endsWith('"'))
  ) {
    s = s.slice(1, -1).trim();
  }

  // optional: support base64-encoded JSON
  if (!s.startsWith("{")) {
    try {
      const decoded = Buffer.from(s, "base64").toString("utf8").trim();
      if (decoded.startsWith("{")) s = decoded;
    } catch {
      // ignore
    }
  }

  const credentials = JSON.parse(s);

  // common: private_key stored with escaped newlines
  if (typeof credentials?.private_key === "string") {
    credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
  }

  return credentials;
}

export async function POST(req: Request) {
  try {
    const spreadsheetId = mustEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
    const range = process.env.GOOGLE_SHEETS_RANGE ?? "Leads!A:F";
    const serviceAccountJson = mustEnv("GOOGLE_SERVICE_ACCOUNT_JSON");

    let body: LeadPayload;
    try {
      body = (await req.json()) as LeadPayload;
    } catch (e) {
      console.error("Leads API invalid JSON body:", e);
      return NextResponse.json(
        { ok: false, error: "invalid_json" },
        { status: 400 }
      );
    }

    // Honeypot: se preenchido, considera bot e retorna ok silencioso
    if (body.company && body.company.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const subject = (body.subject ?? "").trim();
    const message = (body.message ?? "").trim();
    const source = (body.source ?? "vizyn-landing").trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "missing_required_fields" },
        { status: 400 }
      );
    }

    const credentials = parseServiceAccountJson(serviceAccountJson);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const createdAt = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[createdAt, name, email, subject, message, source]],
      },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Leads API error:", err);
    return NextResponse.json(
      { ok: false, error: "internal_error" },
      { status: 500 }
    );
  }
}
