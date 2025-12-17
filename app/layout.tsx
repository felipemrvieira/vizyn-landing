import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const inter = Inter({ subsets: ["latin"] });

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Vizyn - Gestão condominial",
    default: "Vizyn - Gestão condominial",
  },
  description:
    "Vizyn é um app de gestão condominial focado em comunidade: comunicação centralizada, organização da rotina e mais transparência para síndicos, moradores e administradoras.",
  applicationName: "Vizyn",
  keywords: [
    "gestão condominial",
    "condomínio",
    "síndico",
    "administradora",
    "comunicação condominial",
    "assembleia",
    "avisos",
    "reservas",
    "ocorrências",
    "portaria",
  ],
  openGraph: {
    title: "Vizyn - Gestão condominial",
    description:
      "Comunicação e gestão do condomínio em um só lugar. Menos ruído, mais transparência e uma comunidade mais conectada.",
    type: "website",
    siteName: "Vizyn",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vizyn - Gestão condominial",
    description:
      "Gestão condominial focada em comunidade: comunicação centralizada, organização e controle.",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased text-base text-foreground bg-background",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          storageKey="saas-theme"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
