"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BLOG_POSTS, BlogPost } from "@/lib/blogData";
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  BookOpen, 
  Sparkles,
  Tag,
  Instagram,
  Share2,
  Check,
  Copy,
  ExternalLink
} from "lucide-react";

export default function BlogPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const [instagramCodeQuery, setInstagramCodeQuery] = useState("");
  const [showInstagramPanel, setShowInstagramPanel] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // URL parametresinden Instagram kodunu oku (?ig=IG-01 veya ?kod=01 veya ?post=slug)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const igParam = params.get("ig") || params.get("kod");
      const postParam = params.get("post");

      if (igParam) {
        setShowInstagramPanel(true);
        const cleanCode = igParam.toUpperCase().replace("#", "").trim();
        const matched = BLOG_POSTS.find(
          p => p.instagramCode.toUpperCase() === cleanCode || 
               p.instagramCode.replace("IG-", "") === cleanCode ||
               p.id === cleanCode
        );
        if (matched) {
          router.push(`/blog/${matched.slug}`);
        } else {
          setSearchQuery(igParam);
        }
      } else if (postParam) {
        router.push(`/blog/${postParam}`);
      }
    }
  }, [router]);

  const categories = [
    "Tümü",
    "Mali Müşavirlik",
    "Devlet Teşvikleri",
    "Yönetim Muhasebesi",
    "KOSGEB",
    "Vergi Mevzuatı"
  ];

  const handleInstagramCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instagramCodeQuery) return;

    const query = instagramCodeQuery.toUpperCase().replace("#", "").trim();
    const matched = BLOG_POSTS.find(
      p => p.instagramCode.toUpperCase() === query || 
           p.instagramCode.replace("IG-", "") === query ||
           p.title.toLowerCase().includes(query.toLowerCase())
    );

    if (matched) {
      router.push(`/blog/${matched.slug}`);
    } else {
      setSearchQuery(instagramCodeQuery);
    }
  };

  const copyInstagramShareLink = (post: BlogPost, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/blog?ig=${post.instagramCode}`;
      navigator.clipboard.writeText(url);
      setCopiedSlug(post.slug);
      setTimeout(() => setCopiedSlug(null), 2500);
    }
  };

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === "Tümü" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.instagramCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS[0];
  const isFeaturedActive = selectedCategory === "Tümü" && !searchQuery;
  const gridPosts = isFeaturedActive
    ? filteredPosts.filter((post) => post.id !== featuredPost.id)
    : filteredPosts;

  return (
    <div className="min-h-screen bg-[#040a1a] text-white pt-28 pb-24 page-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs & Header */}
        <div className="flex items-center space-x-2 text-xs text-white/50 mb-6">
          <Link href="/" className="hover:text-white">Ana Sayfa</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#d4af37]">Blog &amp; Rehberler</span>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#d4af37]/30 bg-[#071128] text-xs font-semibold text-[#d4af37] tracking-wider uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Bilgi &amp; Mevzuat Merkezi</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
            Şirketiniz İçin <span className="gold-gradient-text font-serif italic">Stratejik Rehberler</span>
          </h1>

          <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto">
            Vergi mevzuatı, şirket kuruluşu, KOSGEB hibeleri ve yönetim muhasebesi alanında en güncel rehberler.
          </p>
        </div>

        {/* 📸 INSTAGRAM POST YÖNLENDİRME MODÜLÜ */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#180a2b]/80 via-[#071330]/90 to-[#040a1a] border border-[#d4af37]/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 text-[11px] font-semibold text-pink-300">
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>Instagram Paylaşımları &amp; Link In Bio</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold text-white">
                Instagram&apos;dan mı geldiniz? <span className="text-[#faecc0]">İlgili Yazıya Tek Tıkla Ulaşın</span>
              </h2>
              <p className="text-xs sm:text-sm text-white/70">
                Instagram gönderi açıklamasında belirtilen <strong>Gönderi Kodunu</strong> (örn: <span className="text-[#d4af37] font-mono">IG-01</span>) girerek doğrudan makaleye gidebilirsiniz.
              </p>
            </div>

            {/* Arama Formu */}
            <form onSubmit={handleInstagramCodeSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-2.5">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={instagramCodeQuery}
                  onChange={(e) => setInstagramCodeQuery(e.target.value)}
                  placeholder="Post Kodu (örn: IG-01)..."
                  className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b89025] text-black font-bold text-xs hover:opacity-95 transition-all flex items-center justify-center space-x-1.5 shadow-lg"
              >
                <span>Yazıya Git</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Son Instagram Postları Hızlı Butonları */}
          <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-white/50 font-medium">Öne Çıkan Postlar:</span>
            {BLOG_POSTS.slice(0, 5).map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d4af37]/40 text-[11px] text-white/80 transition-all group"
              >
                <span className="font-mono text-[#d4af37] font-bold">{p.instagramCode}</span>
                <span className="truncate max-w-[130px] sm:max-w-[200px]">{p.title}</span>
                <ArrowRight className="w-3 h-3 text-white/30 group-hover:text-[#d4af37] group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 pb-8 border-b border-white/10">
          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#d4af37] text-black font-semibold shadow-md shadow-[#d4af37]/20"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Konu, kod veya kelime ara..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        {/* Featured Post (Only shown when filter is 'Tümü' and no search) */}
        {selectedCategory === "Tümü" && !searchQuery && (
          <div className="mb-16">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group glass-panel rounded-3xl overflow-hidden border border-[#d4af37]/30 hover:border-[#d4af37] transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 relative h-72 sm:h-96 w-full overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040a1a] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#040a1a]/90" />
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-[#d4af37] text-black text-[11px] font-bold uppercase tracking-wider">
                    Öne Çıkan Rehber
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#d4af37]/40 text-[#faecc0] font-mono text-[11px] font-bold">
                    {featuredPost.instagramCode}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
                <div className="flex items-center space-x-4 text-xs text-white/50">
                  <span className="text-[#d4af37] font-semibold">{featuredPost.category}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#faecc0] transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-sm text-white/70 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#d4af37] group-hover:text-white transition-colors">
                    <span>Makaleyi İnceleyin</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
                  </div>

                  <button
                    type="button"
                    onClick={(e) => copyInstagramShareLink(featuredPost, e)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all text-xs flex items-center space-x-1"
                    title="Instagram paylaşım linkini kopyala"
                  >
                    {copiedSlug === featuredPost.slug ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040a1a] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#071330]/90 backdrop-blur-md border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-semibold tracking-wide">
                      {post.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white/80 font-mono text-[10px] font-bold">
                      {post.instagramCode}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3 text-[11px] text-white/50">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-[#d4af37]" />
                      <span>{post.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-[#d4af37]" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#faecc0] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-white/60 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5 text-xs text-[#d4af37] font-medium">
                <div className="flex items-center space-x-1">
                  <span>Devamını Oku</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>

                <button
                  type="button"
                  onClick={(e) => copyInstagramShareLink(post, e)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all text-[11px] flex items-center space-x-1"
                  title="Instagram linkini kopyala"
                >
                  {copiedSlug === post.slug ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3 h-3" />
                      <span>IG Link</span>
                    </>
                  )}
                </button>
              </div>
            </Link>
          ))}
        </div>

        {gridPosts.length === 0 && !isFeaturedActive && (
          <div className="text-center py-20">
            <p className="text-white/50 text-sm">Aradığınız kriterlere uygun yazı bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}
