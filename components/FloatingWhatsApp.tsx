"use client";

import React, { useState } from "react";

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "905536221122";
  const displayPhone = "0553 622 11 22";
  const defaultMessage = encodeURIComponent(
    "Merhaba, ROTAYD Mali Müşavirlik ve Danışmanlık hizmetleriniz hakkında bilgi almak istiyorum."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center select-none"
      style={{ isolation: "isolate" }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
        aria-label={`WhatsApp ile iletişime geçin: ${displayPhone}`}
      >
        {/* Tooltip on Desktop Hover */}
        <div
          className={`hidden sm:flex items-center space-x-2.5 mr-3 px-4 py-2.5 rounded-2xl bg-[#071330]/95 border border-[#d4af37]/40 shadow-2xl backdrop-blur-md transition-all duration-300 pointer-events-none ${
            isHovered
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-3"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-white/70 font-medium leading-none">WhatsApp İletişim</span>
            <span className="text-xs font-bold text-[#faecc0] tracking-wide mt-0.5">{displayPhone}</span>
          </div>
        </div>

        {/* Outer Glow Ring */}
        <span
          className="absolute -inset-1 rounded-full bg-[#d4af37]/35 blur-md group-hover:bg-[#d4af37]/60 group-hover:scale-115 transition-all duration-500 animate-pulse pointer-events-none"
          aria-hidden="true"
        />

        {/* Floating Button with Golden Gradient */}
        <div
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-108 group-hover:-translate-y-0.5 group-active:scale-95 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #faecc0 0%, #dfb84b 35%, #c89525 70%, #9e6f12 100%)",
            border: "1.5px solid rgba(255, 255, 255, 0.45)",
            boxShadow: "0 8px 24px rgba(212, 175, 55, 0.45), 0 3px 8px rgba(0, 0, 0, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.7)",
          }}
        >
          {/* Authentic WhatsApp SVG Icon */}
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 text-[#040a1a] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 drop-shadow-sm"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.665-.698c.954.521 1.763.784 2.795.784 3.18 0 5.766-2.587 5.768-5.766.001-3.18-2.586-5.771-5.769-5.771zm3.392 8.235c-.143.402-.716.736-1.157.785-.432.048-.996.069-2.883-.714-2.288-.949-3.766-3.266-3.88-3.418-.114-.153-.923-1.228-.923-2.342 0-1.115.586-1.662.795-1.888.209-.226.456-.283.608-.283.152 0 .304.001.437.008.14.007.327-.053.511.391.19.458.647 1.577.704 1.692.057.115.095.25.019.402-.076.153-.114.248-.228.381-.114.133-.24.298-.342.4-.114.114-.233.238-.1.467.133.228.591.975 1.269 1.579.873.777 1.609 1.018 1.838 1.132.228.114.362.095.495-.057.133-.152.571-.666.723-.895.152-.228.304-.19.513-.114.209.076 1.325.625 1.553.739.228.114.38.171.437.266.057.095.057.552-.086.954zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.436 5.176L2 22l4.966-1.396A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2a8.16 8.16 0 01-4.223-1.168l-.303-.18-2.951.829.839-2.871-.197-.315A8.165 8.165 0 013.8 12c0-4.522 3.678-8.2 8.2-8.2 4.522 0 8.2 3.678 8.2 8.2 0 4.522-3.678 8.2-8.2 8.2z" />
          </svg>
        </div>
      </a>
    </div>
  );
}
