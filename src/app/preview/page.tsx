"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import { generateSvg } from "../../lib/svg";
import { downloadImage } from "../../lib/export";

function PreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const text = searchParams.get("text") || "Quiet Goals";
  const moodId = searchParams.get("mood") || "calm";
  const animate = searchParams.get("animate") === 'true';
  const variantId = searchParams.get("variant") || "center-soft"; // Default if not provided

  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");
  const [svgContent, setSvgContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

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
          text,
          moodId,
          variantId,
          width,
          height
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

    generate();

    return () => { active = false; };
  }, [text, moodId, viewMode, variantId]);

  const handleDownload = async (size: "mobile" | "desktop") => {
    // Regenerate SVG with embedded fonts for export
    const { width, height } = dimensions[size];

    try {
      const svgToExport = await generateSvg({
        text,
        moodId,
        variantId,
        width,
        height,
        embedFont: true // Embed fonts for standalone image
      });

      await downloadImage(svgToExport, `quiet-goals-${size}.png`, width, height, 'png');
    } catch (e) {
      console.error("Download failed", e);
      alert("Download failed.");
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-6xl flex flex-col items-center space-y-12">

        {/* Header */}
        <div className="w-full flex justify-between items-center max-w-2xl px-4">
          <button
            onClick={() => router.back()}
            className="text-sm font-medium text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-2"
          >
            ← Edit
          </button>
          <h2 className="font-serif text-xl text-stone-900">Preview</h2>
          <div className="w-12"></div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 w-full">

          {/* Controls */}
          <div className="flex flex-col gap-8 order-2 lg:order-1 items-center lg:items-end">
            <div className="bg-white rounded-full p-1.5 shadow-sm border border-stone-100 inline-flex">
              {(["mobile", "desktop"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${viewMode === mode
                      ? "bg-stone-900 text-white shadow-md"
                      : "text-stone-500 hover:text-stone-900"
                    }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 w-48">
              <button
                onClick={() => handleDownload("mobile")}
                className="w-full bg-white border border-stone-200 text-stone-900 px-6 py-3 rounded-lg text-sm font-medium hover:bg-stone-50 hover:border-stone-300 transition-all text-center"
              >
                Download Mobile
              </button>
              <button
                onClick={() => handleDownload("desktop")}
                className="w-full bg-white border border-stone-200 text-stone-900 px-6 py-3 rounded-lg text-sm font-medium hover:bg-stone-50 hover:border-stone-300 transition-all text-center"
              >
                Download Desktop
              </button>
            </div>

            {animate && (
              <p className="text-xs text-stone-400 max-w-[200px] text-center lg:text-right">
                Animation is active in preview. <br /> Exports are static PNGs.
              </p>
            )}
          </div>

          {/* Preview Image */}
          <div
            className={`relative order-1 lg:order-2 transition-all duration-500 ease-in-out ${viewMode === "mobile"
                ? "w-[320px] aspect-[9/16]"
                : "w-full max-w-3xl aspect-[16/9]"
              } bg-stone-200 shadow-2xl shadow-stone-200/50 rounded-lg overflow-hidden ring-1 ring-black/5`}
          >

            {/* Loading State Overlay */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-stone-100 z-10">
                <span className="text-stone-400 text-sm animate-pulse">Generating...</span>
              </div>
            )}

            <div
              className={`w-full h-full transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'} ${animate ? 'animate-pulse-slow' : ''}`}
              dangerouslySetInnerHTML={{ __html: svgContent }}
              style={{
                // We scale the SVG to fit the container
                // The SVG has fixed width/height attributes (e.g., 1080x1920)
                // We use standard CSS to make it responsive within the container
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
            {/* Inline style to ensure SVG scales correctly */}
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

        </div>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-stone-300">Loading...</div>}>
      <PreviewContent />
    </Suspense>
  );
}
