import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WebsiteSchema, PersonSchema } from "@/components/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Your Name - Portfolio",
    template: "%s | Your Name",
  },
  description:
    "Software Developer passionate about building amazing web experiences",
  keywords: ["developer", "portfolio", "react", "nextjs", "typescript"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
      "application/atom+xml": "/atom.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <WebsiteSchema
          name="Your Name - Portfolio"
          description="Software Developer passionate about building amazing web experiences"
          url={process.env.NEXT_PUBLIC_BASE_URL || "https://yoursite.com"}
        />
        <PersonSchema
          name="Your Name"
          jobTitle="Software Developer"
          url={process.env.NEXT_PUBLIC_BASE_URL || "https://yoursite.com"}
          sameAs={[
            "https://github.com/kentaro-m",
            "https://linkedin.com/in/kentaro-m",
            "https://twitter.com/kentaro_m",
          ]}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
