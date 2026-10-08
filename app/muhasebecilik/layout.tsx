import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mali Müşavirlik & Muhasebecilik Hizmetleri Ankara | ROTAYD",
  description:
    "Ankara Çankaya Suit Tower'da TÜRMOB & ASMMMO ruhsatlı yetkili mali müşavirlik, muhasebecilik, vergi denetimi, e-defter, şirket kuruluşu ve yönetim muhasebesi danışmanlığı.",
  keywords:
    "Mali Müşavirlik, Muhasebecilik, Müşavirlik, Mali Müşavir Ankara, Çankaya Mali Müşavir, SMMM Süleyman İlhan, Vergi Denetimi, Şirket Kuruluşu, E-Defter, E-Fatura, Yönetim Muhasebesi, Bordrolama, Rotayd",
  openGraph: {
    title: "Mali Müşavirlik & Muhasebecilik Hizmetleri Ankara | ROTAYD",
    description:
      "TÜRMOB & ASMMMO ruhsatlı yetkili mali müşavirlik, proaktif vergi planlaması ve yönetim muhasebesi ortaklığı.",
    images: ["/images/hero-muhasebecilik.webp"],
  },
};

export default function MuhasebecilikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
