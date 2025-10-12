import type { Metadata } from "next";
import { Orbitron, Audiowide, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VORTIX - Premium Motorbike Accessories",
  description: "High-end motorbike accessories and parts - Futuristic cyberpunk showroom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${audiowide.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
