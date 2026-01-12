"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PreviewPanel from "@/components/PreviewPanel";
import ControlPanel from "@/components/ControlPanel";
import { IoMdClose, IoMdCreate, IoIosArrowUp } from "react-icons/io";

export default function CreatePage() {
  const router = useRouter();
  const [milestone, setMilestone] = useState("");
  const [mood, setMood] = useState("calm");
  const [variant, setVariant] = useState("center-soft");
  const [animate, setAnimate] = useState(false);

  // Background Image State
  const [bgMode, setBgMode] = useState<'procedural' | 'image'>('procedural');
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isFetchingImage, setIsFetchingImage] = useState(false);

  const [hideControls, setHideControls] = useState(false);

  return (
    <div className="h-[100dvh] w-full bg-stone-50 overflow-hidden flex flex-col lg:flex-row">

      {/* LEFT COLUMN (Desktop) / BOTTOM SHEET (Mobile): Controls */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-30 bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.08)]
          transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          flex flex-col
          lg:static lg:h-full lg:w-[420px] xl:w-[480px] lg:shadow-none lg:border-r lg:border-stone-100
          ${hideControls ? 'h-[80px]' : 'h-[55vh]'}
          rounded-t-[32px] lg:rounded-none
        `}
      >
        {/* Mobile Drag Handle / Header */}
        <div
          className="flex lg:hidden items-center justify-between px-6 py-2 cursor-pointer border-b border-stone-50"
          onClick={() => setHideControls(!hideControls)}
        >
          <div className="flex items-center gap-3">
            <div className="bg-stone-100 p-2 rounded-full text-stone-600">
              {hideControls ? <IoMdCreate size={20} /> : <IoIosArrowUp size={20} className="rotate-180" />}
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-900">
                {hideControls ? 'Edit Wallpaper' : 'Customize'}
              </h2>
              {hideControls && <p className="text-[10px] text-stone-400">Tap to expand controls</p>}
            </div>
          </div>

          <button
            className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
          >
            {hideControls ? <IoIosArrowUp /> : <IoMdClose size={24} />}
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between px-8 py-6 border-b border-stone-100">
          <button
            onClick={() => router.back()}
            className="text-xs font-medium text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-2 uppercase tracking-wider"
          >
            ← Back
          </button>
          <h1 className="font-serif text-xl text-stone-900">Design Mode</h1>
        </div>

        {/* Scrollable Content */}
        <div className={`
          flex-1 overflow-y-auto px-6 lg:p-8
          ${hideControls ? 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto' : 'opacity-100'}
          transition-opacity duration-300 delay-100
        `}>
          <div className="lg:hidden mb-6">
            {/* Mobile-only header inside scroll area if needed, or keeping it clean */}
          </div>

          <div className="hidden lg:block mb-8 space-y-1">
            <h2 className="font-serif text-3xl text-stone-900">Design your goal.</h2>
            <p className="text-stone-500 text-sm">Create a quiet reminder for your device.</p>
          </div>

          <ControlPanel
            {...{
              text: milestone,
              setText: setMilestone,
              moodId: mood,
              setMood,
              variantId: variant,
              setVariant,
              animate,
              setAnimate,
              bgMode,
              setBgMode,
              backgroundImage,
              setBackgroundImage,
              isFetchingImage,
              setIsFetchingImage
            }}
          />

          {/* Extra padding for mobile bottom safe area */}
          <div className="h-8 lg:hidden" />
        </div>
      </div>

      {/* RIGHT COLUMN (Desktop) / TOP AREA (Mobile): Preview */}
      <div className="flex-1 relative bg-stone-100 lg:bg-stone-50 flex flex-col items-center justify-center transition-all duration-500">
        {/* Mobile Header (When controls collapsed, maybe show title?) */}

        <div className={`
            w-full h-full flex items-center justify-center transition-all duration-500
            ${hideControls ? 'pb-24 scale-100' : 'pb-[58vh] scale-95 lg:scale-100 lg:pb-0'}
         `}>
          <div className="w-full max-w-[400px] lg:max-w-none lg:w-full lg:h-full lg:flex lg:items-center lg:justify-center lg:sticky lg:top-0">
            <PreviewPanel
              {...{
                text: milestone,
                moodId: mood,
                variantId: variant,
                animate,
                bgMode,
                backgroundImage,
                isFetchingImage,
                mobileMaxHeight: hideControls ? '75vh' : '40vh'
              }}
            />
          </div>        </div>
      </div>

    </div>
  );
}

