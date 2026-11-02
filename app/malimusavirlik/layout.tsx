import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mali Müşavir & Türkçe Muhasebeci Ankara Çayyolu | ROTAYD",
  description:
    "Ankara Çayyolu ve Çankaya'da TÜRMOB & ASMMMO ruhsatlı yetkili mali müşavir, Türkçe muhasebeci, vergi planlaması, e-defter, şirket kuruluşu ve yönetim muhasebesi danışmanlığı.",
  keywords:
    "türkçe muhasebeci, mali müşavir ankara çayyolu, ankara mali müşavir, çayyolu muhasebeci, çankaya mali müşavir, vergi denetimi, şirket kuruluşu çayyolu, e-defter, e-fatura, yönetim muhasebesi, vergi mevzuatı, rotayd",
  openGraph: {
    title: "Mali Müşavir & Türkçe Muhasebeci Ankara Çayyolu | ROTAYD",
    description:
      "TÜRMOB & ASMMMO ruhsatlı yetkili mali müşavir, proaktif vergi planlaması ve yönetim muhasebesi ortaklığı.",
    images: ["/images/hero-muhasebecilik.webp"],
  },
};

export default function MaliMusavirlikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
