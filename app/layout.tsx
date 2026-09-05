import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Providers from "@/components/Providers";
import ReceiptPreloader from "@/components/ReceiptPreloader";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  metadataBase: new URL('https://rotayd.com'),
  title: "ROTAYD | Mali Müşavirlik & Yönetim Danışmanlığı",
  description: "ROTAYD Mali Müşavirlik ve Yönetim Danışmanlığı. Stratejik yönetim muhasebesi, vergi denetimi, SGK istihdam teşvikleri, yatırım teşvik belgesi ve KOSGEB hibe danışmanlığı.",
  keywords: "Rotayd, Mali Müşavirlik, Muhasebe, Yönetim Danışmanlığı, SGK Teşvikleri, Yatırım Teşvik, KOSGEB, Çankaya Muhasebeci, Ankara Mali Müşavirlik, Konutkent Suit Tower",
  openGraph: {
    title: "ROTAYD Mali Müşavirlik ve Yönetim Danışmanlığı",
    description: "Stratejik yönetim muhasebesi ve devlet teşvikleri rehberliği.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: '/icon.png' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className="bg-[#040a1a] text-white antialiased selection:bg-[#d4af37] selection:text-[#040a1a] transition-colors duration-300">
        <Providers>
          <ReceiptPreloader />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
