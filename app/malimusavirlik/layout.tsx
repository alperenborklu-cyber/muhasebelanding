import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mali Müşavir & Türkçe Muhasebeci Ankara Çayyolu | ROTAYD",
  description:
    "Ankara Çayyolu ve Çankaya'da Ankara Serbest Muhasebeci Mali Müşavirler Odası (ASMMMO) Üyesi, TÜRMOB mesleki standartlarına uygun mali müşavir, Türkçe muhasebeci, vergi mevzuatı, e-defter, şirket kuruluşu ve yönetim muhasebesi danışmanlığı.",
  keywords:
    "türkçe muhasebeci, mali müşavir ankara çayyolu, ankara mali müşavir, çayyolu muhasebeci, çankaya mali müşavir, vergi denetimi, şirket kuruluşu çayyolu, e-defter, e-fatura, yönetim muhasebesi, vergi mevzuatı, rotayd",
  openGraph: {
    title: "Mali Müşavir & Türkçe Muhasebeci Ankara Çayyolu | ROTAYD",
    description:
      "ASMMMO Üyesi | TÜRMOB, proaktif vergi planlaması ve yönetim muhasebesi ortaklığı.",
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
