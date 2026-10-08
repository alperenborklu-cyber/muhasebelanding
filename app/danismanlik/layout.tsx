import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yönetim Danışmanlığı, Devlet Teşvikleri & KOSGEB Hibeleri | ROTAYD",
  description:
    "Yatırım Teşvik Belgesi, KOSGEB hibe programları, Ticaret Bakanlığı ihracat destekleri, Ar-Ge ve Tasarım Merkezi kurulumu yönetim danışmanlığı ve müşavirlik hizmetleri.",
  keywords:
    "Yönetim Danışmanlığı, Danışmanlık, Müşavirlik, Devlet Teşvikleri, Yatırım Teşvik Belgesi, KOSGEB Hibeleri, KOSGEB Danışmanlık, Ticaret Bakanlığı Destekleri, Ar-Ge Merkezi Danışmanlığı, Ankara Yönetim Danışmanı, Rotayd",
  openGraph: {
    title: "Yönetim Danışmanlığı, Devlet Teşvikleri & KOSGEB Hibeleri | ROTAYD",
    description:
      "Sanayi ve Ticaret Bakanlığı, KOSGEB hibe veri tabanları taraması ve kurumsal büyüme mimarisi danışmanlığı.",
    images: ["/images/hero-danismanlik.webp"],
  },
};

export default function DanismanlikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
