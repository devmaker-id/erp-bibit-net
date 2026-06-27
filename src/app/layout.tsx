import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "ERP Bibit Net",
    template: "%s | ERP Bibit Net",
  },

  description: "Enterprise Resource Planning",

  applicationName: "ERP Bibit Net",

  authors: [
    {
      name: "Bibit Net",
    },
  ],

  icons: {
    icon: "/logo/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
          className="
              min-h-screen
              bg-background
              text-foreground
              antialiased
          "
      >{children}</body>
    </html>
  );
}
