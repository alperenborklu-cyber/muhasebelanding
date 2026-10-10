"use client";

import ScrollCanvasDoor from "@/components/ScrollCanvasDoor";
import ReferencesMarquee from "@/components/ReferencesMarquee";
import AppointmentForm from "@/components/AppointmentForm";
import { useEffect } from "react";

export default function Home() {
  // Clean any #hash from URL and handle smooth scroll query
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      const params = new URLSearchParams(window.location.search);
      const navTarget = params.get("nav");
      if (navTarget) {
        setTimeout(() => {
          document.getElementById(navTarget)?.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, "", window.location.pathname);
        }, 300);
      }
    }
  }, []);

  return (
    <div className="bg-[#040a1a] text-white transition-colors duration-300 page-container">
      {/* 1. Creative Scrollytelling Golden Door Canvas */}
      <ScrollCanvasDoor />

      {/* 2. Sürekli Dönen Türk Firmaları Referanslar Silsilesi */}
      <ReferencesMarquee />

      {/* 3. Stratejik Randevu Formu */}
      <AppointmentForm />
    </div>
  );
}

