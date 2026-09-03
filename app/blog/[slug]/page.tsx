"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/blogData";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  Tag, 
  ShieldCheck, 
  Sparkles,
  Phone,
  CheckCircle2
} from "lucide-react";

export default function BlogPostDetail({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);
  const fallbackRelated = relatedPosts.length > 0 ? relatedPosts : BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#040a1a] text-white pt-28 pb-24 page-container">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-xs text-[#d4af37] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Tüm Rehberlere Dön</span>
          </Link>
        </div>

        {/* Header Information */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 font-semibold">
              {post.category}
            </span>
            <div className="flex items-center space-x-1 text-white/50">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </div>
            <span className="text-white/30">•</span>
            <div className="flex items-center space-x-1 text-white/50">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
            {post.excerpt}
          </p>

          <div className="pt-2 text-xs text-white/50">
            Yazar: <span className="text-white font-medium">{post.author}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-80 sm:h-[450px] w-full rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Body Content */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-6 text-white/80 leading-relaxed text-sm sm:text-base mb-12">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Key Takeaways Box */}
          <div className="p-6 rounded-2xl bg-[#0b1938]/80 border border-[#d4af37]/30 space-y-3 mt-8">
            <div className="flex items-center space-x-2 text-[#d4af37] font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Önemli Çıkarımlar & ROTAYD Tavsiyesi</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-white/80">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Yasal teşvik ve mevzuat değişiklikleri geriye dönük hak kaybına yol açmadan ivedilikle incelenmelidir.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Doğru hazırlanmış başvuru dosyaları devlet desteklerinin onaylanma süresini 3 kat hızlandırır.</span>
              </li>
            </ul>
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Consultation Banner */}
        <div className="glass-panel p-8 rounded-3xl border border-[#d4af37]/40 text-center space-y-4 mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Bu Konuda Şirketinize Özel <span className="gold-gradient-text">Danışmanlık Almak İster misiniz?</span>
          </h3>
          <p className="text-xs sm:text-sm text-white/60 max-w-xl mx-auto">
            ROTAYD uzmanları firmanızın mevcut durumunu ücretsiz analiz ederek en uygun yol haritasını çıkartır.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={post.category === "Mali Müşavirlik" || post.category === "Vergi Mevzuatı" || post.category === "Yönetim Muhasebesi" ? "/muhasebecilik#consultation" : "/danismanlik#consultation"}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b89025] text-black font-semibold text-xs hover:opacity-90 transition-all"
            >
              Ücretsiz Ön Değerlendirme İsteyin
            </Link>
            <a
              href="tel:05536221122"
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium text-xs hover:bg-white/10 transition-all flex items-center space-x-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>0553 622 11 22</span>
            </a>
          </div>
        </div>

        {/* Related Posts */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">İlginizi Çekebilecek Diğer Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {fallbackRelated.map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="group glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/40 p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-semibold text-[#d4af37]">{rel.category}</span>
                  <h4 className="text-base font-bold text-white group-hover:text-[#faecc0] transition-colors mt-1">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-white/60 mt-2 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
                <div className="pt-4 flex items-center space-x-1 text-xs text-[#d4af37] font-medium">
                  <span>İncele</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
