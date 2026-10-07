"use client";

import { useState } from "react";
import { Linkedin, Check } from "lucide-react";

interface LinkedInShareButtonProps {
  url?: string;
  title?: string;
  summary?: string;
  variant?: "primary" | "compact" | "pill";
  className?: string;
}

export default function LinkedInShareButton({
  url,
  title,
  summary,
  variant = "primary",
  className = "",
}: LinkedInShareButtonProps) {
  const [shared, setShared] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let targetUrl = url;
    if (!targetUrl && typeof window !== "undefined") {
      targetUrl = window.location.href;
    }
    if (!targetUrl) {
      targetUrl = "https://rotayd.com";
    }

    // Ensure absolute URL
    if (targetUrl.startsWith("/")) {
      targetUrl = typeof window !== "undefined" ? `${window.location.origin}${targetUrl}` : `https://rotayd.com${targetUrl}`;
    }

    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(targetUrl)}`;

    if (typeof window !== "undefined") {
      window.open(shareUrl, "_blank", "noopener,noreferrer,width=620,height=640");
      setShared(true);
      setTimeout(() => setShared(false), 3000);
    }
  };

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleShare}
        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
          shared
            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
            : "bg-[#0a66c2]/15 hover:bg-[#0a66c2]/30 text-[#38bdf8] hover:text-white border border-[#0a66c2]/40 hover:border-[#0a66c2]"
        } ${className}`}
        title="Bu makaleyi LinkedIn'de paylaş"
      >
        {shared ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Açıldı</span>
          </>
        ) : (
          <>
            <Linkedin className="w-3.5 h-3.5 fill-current" />
            <span>LinkedIn&apos;de Paylaş</span>
          </>
        )}
      </button>
    );
  }

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={handleShare}
        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
          shared
            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
            : "bg-[#0a66c2]/20 hover:bg-[#0a66c2] text-sky-300 hover:text-white border border-[#0a66c2]/40"
        } ${className}`}
        title="LinkedIn'de Paylaş"
      >
        <Linkedin className="w-3 h-3 fill-current" />
        <span>Paylaş</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
        shared
          ? "bg-emerald-600 text-white shadow-emerald-900/40"
          : "bg-[#0a66c2] hover:bg-[#004182] text-white shadow-[0_4px_14px_rgba(10,102,194,0.35)] hover:shadow-[0_6px_20px_rgba(10,102,194,0.5)] hover:scale-[1.02] active:scale-[0.98]"
      } ${className}`}
    >
      {shared ? (
        <>
          <Check className="w-4 h-4" />
          <span>LinkedIn&apos;de Paylaşım Ekranı Açıldı</span>
        </>
      ) : (
        <>
          <Linkedin className="w-4 h-4 fill-current" />
          <span>LinkedIn&apos;de Paylaş</span>
        </>
      )}
    </button>
  );
}
