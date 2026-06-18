import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { invitationData } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: invitationData.seo.title,
  description: invitationData.seo.description,
  openGraph: {
    title: invitationData.seo.title,
    description: invitationData.seo.description,
    type: "website",
    url: "/welcome",
    images: [
      {
        url: invitationData.seo.image,
        width: 1200,
        height: 630,
        alt: invitationData.seo.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: invitationData.seo.title,
    description: invitationData.seo.description,
    images: [invitationData.seo.image],
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
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
