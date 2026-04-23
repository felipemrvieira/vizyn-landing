# Vizyn Landing

Landing page institucional da Vizyn (Next.js App Router).

## Estado Atual

- projeto institucional separado da aplicação operacional
- inclui endpoint server-side `POST /api/leads`
- validação local depende de instalar dependências no diretório da landing
- metadados e README devem permanecer alinhados com a marca Vizyn

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

## Situação atual

- a landing usa stack moderna de Next.js e Tailwind
- a checagem local neste workspace depende de `npm install` no diretório da landing
- este repositório não deve carregar naming ou metadados herdados de template quando for possível substituir

## API de Leads

Endpoint server-side: `POST /api/leads`

Variáveis necessárias:

- `GOOGLE_SHEETS_SPREADSHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_JSON`
- `GOOGLE_SHEETS_RANGE` (opcional, default `Leads!A:J`)

Campos atualmente enviados pela landing:

- `name`
- `email`
- `role`
- `unitsBand`
- `hasPortaria`
- `primaryPain`
- `subject`
- `message`
- `source`

## Governança

- Package manager oficial: **npm**
- Manter README e metadados alinhados com a marca Vizyn (evitar referências de template)
- README deve refletir o estado real do projeto e seus pré-requisitos de build
