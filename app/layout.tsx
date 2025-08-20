import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/navbar";
import { Toaster } from "sonner";
import AppLoader from "@/components/app-loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ahmed Nasser | Front-End Developer",
  description:
    "Experienced Front-End Developer specializing in React, Next.js, and modern web technologies. View my portfolio to see my latest projects and skills.",
  keywords:
    "front-end developer, react developer, nextjs developer, web developer, javascript developer, typescript developer",
  authors: [{ name: "Ahmed Nasser" }],
  metadataBase: new URL("https://your-domain.com"),
  alternates: { canonical: "https://your-domain.com" },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/assets/portfolio.jpg", sizes: "16x16", type: "image/png" },
      { url: "/assets/portfolio.jpg", sizes: "32x32", type: "image/png" }
    ],
    apple: [{ url: "/assets/portfolio.jpg", sizes: "180x180", type: "image/png" }],
    shortcut: ["/assets/portfolio.jpg"],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    siteName: "Ahmed Nasser Portfolio",
    title: "Ahmed Nasser | Front-End Developer",
    description:
      "Experienced Front-End Developer specializing in React, Next.js, and modern web technologies.",
    images: [
      {
        url: "https://your-domain.com/portfolio.jpg",
        width: 1200,
        height: 630,
        alt: "Ahmed Nasser - Front-End Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Nasser | Front-End Developer",
    description:
      "Experienced Front-End Developer specializing in React, Next.js, and modern web technologies.",
    images: ["https://your-domain.com/portfolio.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className={inter.className}>
        <AppLoader />
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <main>{children}</main>
            <Toaster position="top-right" />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
