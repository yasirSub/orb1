import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/chat/WhatsAppButton'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orb1 | Creative Agency",
  description: "Transform your digital presence with Orb1's innovative solutions in web development, design, and digital marketing."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <WhatsAppButton phoneNumber="1234567890" />
        </div>
      </body>
    </html>
  );
}
