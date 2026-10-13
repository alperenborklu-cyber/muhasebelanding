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
  title: "ROTAYD | Mali Müşavir & Yönetim Danışmanlığı Ankara Çayyolu",
  description: "ROTAYD Mali Müşavirlik ve Yönetim Danışmanlığı. Ankara Çayyolu ve Çankaya'da Türkçe muhasebeci, mali müşavir, vergi planlaması, SGK istihdam teşvikleri ve KOSGEB hibe danışmanlığı.",
  keywords: "türkçe muhasebeci, mali müşavir ankara çayyolu, ankara mali müşavir, çayyolu muhasebeci, çankaya mali müşavir, rotayd, yönetim danışmanlığı, muhasebe, danışmanlık, sgk teşvikleri, yatırım teşvik, kosgeb hibe, ankara smmm, vergi planlaması, şirket kuruluşu çayyolu",
  openGraph: {
    title: "ROTAYD | Mali Müşavir & Yönetim Danışmanlığı Ankara Çayyolu",
    description: "Ankara Çayyolu ve Çankaya'da Türkçe muhasebeci, stratejik mali müşavirlik ve devlet teşvikleri rehberliği.",
    images: ["/logo.webp"],
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
    <html lang="tr" className="scroll-smooth dark">
      <body className="bg-[#040a1a] text-white antialiased selection:bg-[#d4af37] selection:text-[#040a1a]">
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
