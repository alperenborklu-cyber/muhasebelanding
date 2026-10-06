"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Crop, 
  RotateCw, 
  Check, 
  X, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Sparkles,
  FileText
} from "lucide-react";

interface ImageCropperModalProps {
  isOpen: boolean;
  imageUrl: string | null;
  onClose: () => void;
  onCropComplete: (croppedBlob: Blob, croppedDataUrl: string) => void;
  suggestedCode?: string;
}

export default function ImageCropperModal({
  isOpen,
  imageUrl,
  onClose,
  onCropComplete,
  suggestedCode
}: ImageCropperModalProps) {
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [cropBox, setCropBox] = useState({
    xPercent: 10,
    yPercent: 10,
    widthPercent: 80,
    heightPercent: 80
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imageUrl) {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;
      img.onload = () => {
        setImageElement(img);
        setRotation(0);
        setZoom(1);
        setCropBox({
          xPercent: 5,
          yPercent: 5,
          widthPercent: 90,
          heightPercent: 90
        });
      };
    }
  }, [imageUrl]);

  if (!isOpen || !imageUrl) return null;

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleApplyCrop = () => {
    if (!imageElement) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle rotation in memory
    const isRotated = rotation === 90 || rotation === 270;
    const baseW = isRotated ? imageElement.naturalHeight : imageElement.naturalWidth;
    const baseH = isRotated ? imageElement.naturalWidth : imageElement.naturalHeight;

    // Calculate crop coordinates
    const cropX = (cropBox.xPercent / 100) * baseW;
    const cropY = (cropBox.yPercent / 100) * baseH;
    const cropW = (cropBox.widthPercent / 100) * baseW;
    const cropH = (cropBox.heightPercent / 100) * baseH;

    // Limit maximum dimensions for optimal performance
    const maxDimension = 1400;
    let finalW = cropW;
    let finalH = cropH;
    if (finalW > maxDimension || finalH > maxDimension) {
      const ratio = Math.min(maxDimension / finalW, maxDimension / finalH);
      finalW = Math.round(finalW * ratio);
      finalH = Math.round(finalH * ratio);
    }

    canvas.width = Math.max(100, Math.round(finalW));
    canvas.height = Math.max(100, Math.round(finalH));

    // Fill background with white in case of margins
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    // Scale to final size
    ctx.scale(canvas.width / cropW, canvas.height / cropH);
    ctx.translate(-cropX, -cropY);

    if (rotation !== 0) {
      if (rotation === 90) {
        ctx.translate(baseW, 0);
        ctx.rotate((90 * Math.PI) / 180);
      } else if (rotation === 180) {
        ctx.translate(baseW, baseH);
        ctx.rotate((180 * Math.PI) / 180);
      } else if (rotation === 270) {
        ctx.translate(0, baseH);
        ctx.rotate((270 * Math.PI) / 180);
      }
    }

    ctx.drawImage(imageElement, 0, 0);
    ctx.restore();

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
          onCropComplete(blob, dataUrl);
          onClose();
        }
      },
      "image/jpeg",
      0.85
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#071330] border border-[#d4af37]/40 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#040a1a]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37]">
              <Crop className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Fiş / Slip Kırpma &amp; Hizalama
              </h3>
              <p className="text-[11px] text-white/60">
                Fişin veya kredi kartı slipinin fazlalık kenarlarını kesin
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Code Notice */}
        {suggestedCode && (
          <div className="px-6 py-2 bg-[#d4af37]/10 border-b border-[#d4af37]/20 flex items-center justify-between text-xs">
            <span className="text-white/70">Atanacak Belge Numarası:</span>
            <span className="font-mono font-bold text-[#faecc0] tracking-wide bg-[#040a1a] px-2.5 py-0.5 rounded border border-[#d4af37]/30">
              {suggestedCode}
            </span>
          </div>
        )}

        {/* Preview / Canvas Work Area */}
        <div className="flex-1 overflow-auto p-4 flex flex-col items-center justify-center bg-[#020612] relative min-h-[300px]">
          <div className="relative inline-block max-h-[50vh] max-w-full overflow-hidden rounded-xl border border-white/20 shadow-lg">
            {/* Displaying Image with Rotation & Zoom */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Fiş Önizleme"
              style={{
                transform: `rotate(${rotation}deg) scale(${zoom})`,
                transition: "transform 0.2s ease",
                maxHeight: "48vh",
                maxWidth: "100%",
                objectFit: "contain"
              }}
              className="block select-none"
            />

            {/* Visual Cropping Rectangle Guide */}
            <div
              style={{
                position: "absolute",
                left: `${cropBox.xPercent}%`,
                top: `${cropBox.yPercent}%`,
                width: `${cropBox.widthPercent}%`,
                height: `${cropBox.heightPercent}%`,
                border: "2px dashed #d4af37",
                boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.45)",
                pointerEvents: "none"
              }}
            >
              <div className="absolute top-1 left-1 bg-[#040a1a]/90 text-[10px] text-[#faecc0] px-1.5 py-0.5 rounded border border-[#d4af37]/40 font-mono">
                Fiş Alanı
              </div>
            </div>
          </div>

          {/* Quick Adjust Sliders */}
          <div className="w-full max-w-md mt-4 grid grid-cols-2 gap-3 px-2 text-xs">
            <div>
              <label className="text-[11px] text-white/60 mb-1 block">
                Yatay Kırpma (Genişlik: %{cropBox.widthPercent})
              </label>
              <input
                type="range"
                min="30"
                max="100"
                value={cropBox.widthPercent}
                onChange={(e) =>
                  setCropBox((prev) => {
                    const w = Number(e.target.value);
                    return { ...prev, widthPercent: w, xPercent: Math.max(0, (100 - w) / 2) };
                  })
                }
                className="w-full accent-[#d4af37]"
              />
            </div>
            <div>
              <label className="text-[11px] text-white/60 mb-1 block">
                Dikey Kırpma (Yükseklik: %{cropBox.heightPercent})
              </label>
              <input
                type="range"
                min="30"
                max="100"
                value={cropBox.heightPercent}
                onChange={(e) =>
                  setCropBox((prev) => {
                    const h = Number(e.target.value);
                    return { ...prev, heightPercent: h, yPercent: Math.max(0, (100 - h) / 2) };
                  })
                }
                className="w-full accent-[#d4af37]"
              />
            </div>
          </div>
        </div>

        {/* Toolbar & Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#040a1a] flex flex-wrap items-center justify-between gap-3">
          {/* Controls: Rotate & Zoom */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleRotate}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white flex items-center space-x-1.5 transition-colors"
              title="90 Derece Döndür"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Döndür ({rotation}°)</span>
            </button>

            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.8, +(z + 0.1).toFixed(1)))}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white/80"
              title="Yakınlaştır"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(1)))}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white/80"
              title="Uzaklaştır"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              Orijinali Kullan
            </button>

            <button
              type="button"
              onClick={handleApplyCrop}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89025] text-black font-bold text-xs hover:opacity-95 transition-all flex items-center space-x-1.5 shadow-lg"
            >
              <Check className="w-4 h-4" />
              <span>Kırpmayı Onayla</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
