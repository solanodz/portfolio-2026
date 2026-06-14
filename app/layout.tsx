import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import { SiteFrame } from "./components/site-frame";
import { SiteNav } from "./components/site-nav";
import { ThemeProvider } from "./components/theme-provider";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://solanodz.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Solano de Zuasnabar — AI Engineer",
  description:
    "AI Engineer & Data Scientist building production-grade AI systems: LLM backends, RAG pipelines, computer vision and automation.",
  authors: [{ name: "Solano de Zuasnabar" }],
  keywords: [
    "AI Engineer",
    "Data Scientist",
    "LLM",
    "RAG",
    "Python",
    "Machine Learning",
  ],
  openGraph: {
    title: "Solano de Zuasnabar — AI Engineer",
    description:
      "Building production-grade AI systems: LLM backends, RAG pipelines, computer vision and automation.",
    url: siteUrl,
    siteName: "Solano de Zuasnabar",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, mono.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-bg font-sans text-text">
        <ThemeProvider>
          <SiteNav />
          <SiteFrame />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
