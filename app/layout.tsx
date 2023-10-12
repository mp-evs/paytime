import { Nunito } from "next/font/google";
import ThemeProvider from "./provider";
import "./globals.css";
import Head from "next/head";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV == "production" ? "https://paytime-three.vercel.app" : "http://localhost:3000"
  ),
  title: "Paytime",
  keywords: ["paytime", "punches", "entries", "logs", "time"],
  description: "Check your daily punches in no time!",
  openGraph: {
    title: "Paytime",
    description: "Check your daily punches in no time!",
  },
};

const inter = Nunito({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta property="og:title" content="Paytime" />
        <meta property="og:description" content="Check your daily punches in no time!" />
        <meta property="og:site_name" content="Paytime" />
        <meta property="og:type" content="page" />
      </Head>
      <body className={`${inter.className} dark:bg-slate-900/75`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
