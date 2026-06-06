import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/theme-toggle";
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

const siteUrl = "https://solanodz.dev";

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
      data-theme="light"
      className={cn("h-full", "antialiased", inter.variable, mono.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t);else if(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches)document.documentElement.setAttribute("data-theme","dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full bg-bg font-sans text-text">
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
