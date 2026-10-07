"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS, BlogPost } from "@/lib/blogData";
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  BookOpen, 
  Sparkles,
  Tag
} from "lucide-react";
import LinkedInShareButton from "@/components/LinkedInShareButton";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "Tümü",
    "Mali Müşavirlik",
    "Devlet Teşvikleri",
    "Yönetim Muhasebesi",
    "KOSGEB",
    "Vergi Mevzuatı"
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === "Tümü" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
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

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 pb-8 border-b border-white/10">
          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
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
              placeholder="Konu veya kelime ara..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        {/* Featured Post (Only shown when filter is 'Tümü' and no search) */}
        {selectedCategory === "Tümü" && !searchQuery && (
          <div className="mb-16">
            <div className="group glass-panel rounded-3xl overflow-hidden border border-[#d4af37]/30 hover:border-[#d4af37] transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <Link href={`/blog/${featuredPost.slug}`} className="lg:col-span-7 relative h-72 sm:h-96 w-full overflow-hidden block">
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
                </div>
              </Link>

              <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
                <div className="flex items-center space-x-4 text-xs text-white/50">
                  <span className="text-[#d4af37] font-semibold">{featuredPost.category}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-[#d4af37]" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>

                <Link href={`/blog/${featuredPost.slug}`}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white hover:text-[#d4af37] transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-sm text-white/70 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-white/5">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center space-x-2 text-xs font-semibold text-[#d4af37] hover:text-white transition-colors"
                  >
                    <span>Makaleyi İnceleyin</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
                  </Link>

                  <LinkedInShareButton 
                    url={`/blog/${featuredPost.slug}`}
                    title={featuredPost.title}
                    variant="compact"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map((post) => (
            <div
              key={post.id}
              className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <Link href={`/blog/${post.slug}`} className="relative h-52 w-full overflow-hidden block">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040a1a] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#071330]/90 backdrop-blur-md border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-semibold tracking-wide">
                      {post.category}
                    </span>
                  </div>
                </Link>

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

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-bold text-white hover:text-[#d4af37] transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-white/60 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-white/5 text-xs text-[#d4af37] font-medium">
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center space-x-1 hover:text-white transition-colors"
                >
                  <span>Devamını Oku</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>

                <LinkedInShareButton 
                  url={`/blog/${post.slug}`}
                  title={post.title}
                  variant="compact"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 space-y-4">
            <p className="text-white/60 text-sm">
              &quot;{searchQuery}&quot; aramasına uygun rehber bulunamadı.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Tümü");
              }}
              className="text-xs font-semibold text-[#d4af37] hover:underline cursor-pointer"
            >
              Filtreleri Sıfırla
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
