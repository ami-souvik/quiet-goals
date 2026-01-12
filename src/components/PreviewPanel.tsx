"use client";

import { useState, useEffect } from "react";
import { generateSvg } from "../lib/svg";
import { downloadImage } from "../lib/export";
import { ensureFontLoaded } from "@/lib/fonts";
import { getMood } from "@/lib/moods";
import { getVariant } from "@/lib/variants";
import { exportWallpaperCanvas } from "@/lib/canvasExport";
import { fetchMoodImage } from "@/lib/images";

interface PreviewPanelProps {
  text: string;
  moodId: string;
  variantId: string;
  animate: boolean;
}

export default function PreviewPanel({ text, moodId, variantId, animate }: PreviewPanelProps) {
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");
  const [svgContent, setSvgContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  
  // Background Image State
  const [bgMode, setBgMode] = useState<'procedural' | 'image'>('procedural');
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isFetchingImage, setIsFetchingImage] = useState(false);

  // Dimensions for generation
  const dimensions = {
    mobile: { width: 1080, height: 1920 },
    desktop: { width: 1920, height: 1080 }
  };
  
  // Fetch image when mood changes IF in image mode
  useEffect(() => {
      if (bgMode === 'image') {
          handleFetchImage(true);
      } else {
          setBackgroundImage(null);
      }
  }, [moodId]);

  const handleFetchImage = async (forceRefetch = false) => {
      if (isFetchingImage) return;
      if (!forceRefetch && backgroundImage) return; // Don't refetch if we have one and just toggling back on
      
      setIsFetchingImage(true);
      try {
        const url = await fetchMoodImage(getMood(moodId));
        if (url) {
            setBackgroundImage(url);
            setBgMode('image');
        } else {
            // Failed or no key, stay procedural
            setBgMode('procedural');
        }
      } catch (e) {
          console.error("Failed to fetch image", e);
          setBgMode('procedural');
      } finally {
          setIsFetchingImage(false);
      }
  };
  
  const toggleBgMode = () => {
      if (bgMode === 'procedural') {
          setBgMode('image');
          handleFetchImage(true);
      } else {
          setBgMode('procedural');
          setBackgroundImage(null);
      }
  };
  
  const refreshImage = () => {
      if (bgMode === 'image') {
          handleFetchImage(true);
      }
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
      });
    } catch (e) {
      console.error('Export failed', e);
      alert('Export failed.');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto space-y-8">
      {/* Controls */}
      <div className="flex flex-col gap-4 w-full">
         <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
            <div className="bg-white rounded-full p-1.5 shadow-sm border border-stone-100 inline-flex">
              {(["mobile", "desktop"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${viewMode === mode
                    ? "bg-stone-900 text-white shadow-md"
                    : "text-stone-500 hover:text-stone-900"
                    }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
    
            <div className="flex gap-2">
              <button
                onClick={() => handleDownload("mobile")}
                className="px-4 py-2 bg-white border border-stone-200 text-stone-900 rounded-lg text-xs font-medium hover:bg-stone-50 hover:border-stone-300 transition-all"
              >
                Save Mobile
              </button>
              <button
                onClick={() => handleDownload("desktop")}
                className="px-4 py-2 bg-white border border-stone-200 text-stone-900 rounded-lg text-xs font-medium hover:bg-stone-50 hover:border-stone-300 transition-all"
              >
                Save Desktop
              </button>
            </div>
          </div>
          
          {/* Background Toggle */}
          <div className="flex justify-center gap-4">
              <button 
                onClick={toggleBgMode}
                disabled={isFetchingImage}
                className={`text-xs font-medium transition-colors ${bgMode === 'image' ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
              >
                 {bgMode === 'image' ? 'Disable Image Background' : 'Enable Image Background (Optional)'}
              </button>
              
              {bgMode === 'image' && (
                  <button 
                    onClick={refreshImage}
                    disabled={isFetchingImage}
                    className="text-xs font-medium text-stone-500 hover:text-stone-900 flex items-center gap-1"
                  >
                     <span>⟳</span> Shuffle Image
                  </button>
              )}
          </div>
      </div>

      {/* Preview Canvas */}
      <div
        className={`relative transition-all duration-500 ease-in-out ${viewMode === "mobile"
          ? "w-[280px] aspect-[9/16]"
          : "w-full aspect-[16/9]"
          } bg-stone-200 shadow-2xl shadow-stone-200/50 rounded-lg overflow-hidden ring-1 ring-black/5 mx-auto`}
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
            width: 100%;
            height: 100%;
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