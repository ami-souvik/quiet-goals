"use client";

import { useState, useEffect } from "react";
import { RiDownloadLine } from "react-icons/ri";
import { generateSvg } from "../lib/svg";
import { exportWallpaperCanvas } from "@/lib/canvasExport";
import ModeToggle from "./ModeToggle";

interface PreviewPanelProps {
  text: string;
  moodId: string;
  variantId: string;
  animate: boolean;
  bgMode: 'procedural' | 'image';
  backgroundImage: string | null;
  isFetchingImage: boolean;
  mobileMaxHeight?: string;
}

export default function PreviewPanel({
  text,
  moodId,
  variantId,
  animate,
  bgMode,
  backgroundImage,
  isFetchingImage,
  mobileMaxHeight = '70vh'
}: PreviewPanelProps) {
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");
  const [svgContent, setSvgContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Dimensions for generation
  const dimensions = {
    mobile: { width: 1080, height: 1920 },
    desktop: { width: 1920, height: 1080 }
  };

  useEffect(() => {
    let active = true;

    const generate = async () => {
      setLoading(true);
      try {
        const { width, height } = dimensions[viewMode];
        // Generate SVG
        const svg = await generateSvg({
          text: text || "Quiet Goals", // Fallback
          moodId,
          variantId,
          width,
          height,
          backgroundImage: bgMode === 'image' ? backgroundImage : null
          // backgroundImage: 'https://cdn.pixabay.com/photo/2026/01/02/17/42/snow-10049005_1280.jpg'
        });

        if (active) {
          setSvgContent(svg);
        }
      } catch (e) {
        console.error("Generation failed", e);
      } finally {
        if (active) setLoading(false);
      }
    };

    // Debounce generation slightly to avoid excessive calls during typing
    const timeoutId = setTimeout(generate, 300);

    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [text, moodId, viewMode, variantId, backgroundImage, bgMode]);

  const handleDownload = async (size: 'mobile' | 'desktop') => {
    const { width, height } = dimensions[size];

    try {
      await exportWallpaperCanvas({
        text: text || 'Quiet Goals',
        moodId,
        variantId,
        width,
        height,
        filename: `quiet-goals-${size}.png`,
        backgroundImage: bgMode === 'image' ? backgroundImage : null
        // backgroundImage: 'https://cdn.pixabay.com/photo/2026/01/02/17/42/snow-10049005_1280.jpg'
      });
    } catch (e) {
      console.error('Export failed', e);
      alert('Export failed.');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto space-y-2">
      {/* Controls */}
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full grid grid-cols-2 gap-4">
          <ModeToggle {...{ viewMode, setViewMode }} />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => handleDownload(viewMode)}
              className="px-4 py-2 bg-white border border-stone-200 text-stone-900 rounded-lg text-xs font-medium hover:bg-stone-50 hover:border-stone-300 transition-all"
            >
              <RiDownloadLine className="w-5 h-5" />
              <p className="hidden md:block">Save Desktop</p>
            </button>
          </div>
        </div>
      </div>

      {/* Preview Canvas */}
      <div
        className={`
          relative transition-all duration-500 ease-in-out 
          bg-stone-200 shadow-2xl shadow-stone-200/50 rounded-lg overflow-hidden ring-1 ring-black/5 mx-auto
          ${viewMode === "mobile" 
            ? "w-auto h-auto max-w-full aspect-[9/16]" 
            : "w-full aspect-[16/9]"
          }
        `}
        style={{
           maxHeight: viewMode === "mobile" ? mobileMaxHeight : undefined
        }}
      >
        {/* Loading State Overlay */}
        {(loading || isFetchingImage) && (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-100 z-10 opacity-80">
            <span className="text-stone-400 text-sm animate-pulse">
              {isFetchingImage ? 'Fetching image...' : 'Updating...'}
            </span>
          </div>
        )}

        <div
          className={`w-full h-full transition-opacity duration-500 ${loading ? 'opacity-50' : 'opacity-100'} ${animate ? 'animate-pulse-slow' : ''}`}
          dangerouslySetInnerHTML={{ __html: svgContent }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <style jsx global>{`
          svg {
            display: block;
          }
          .animate-pulse-slow {
             animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .85; }
          }
        `}</style>
      </div>

      {animate && (
        <p className="text-[10px] text-stone-400 text-center">
          Animation active in preview. Exports are static.
        </p>
      )}
    </div>
  );
}