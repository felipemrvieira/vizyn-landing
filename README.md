# Vizyn Landing

Landing page institucional da Vizyn (Next.js App Router).

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Requisitos

- Node.js 20+
- npm 10+

## Setup

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## API de Leads

Endpoint server-side: `POST /api/leads`

Variáveis necessárias:

- `GOOGLE_SHEETS_SPREADSHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_JSON`
- `GOOGLE_SHEETS_RANGE` (opcional, default `Leads!A:F`)

## Governança

- Package manager oficial: **npm**
- Manter README e metadados alinhados com a marca Vizyn (evitar referências de template)
