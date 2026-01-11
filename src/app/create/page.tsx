"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VARIANTS } from "../../lib/variants";
import { MOODS } from "../../lib/moods";
import PreviewPanel from "../../components/PreviewPanel";

export default function CreatePage() {
  const router = useRouter();
  const [milestone, setMilestone] = useState("");
  const [mood, setMood] = useState("calm");
  const [variant, setVariant] = useState("center-soft");
  const [animate, setAnimate] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start h-full">

        {/* LEFT COLUMN: Controls */}
        <div className="flex flex-col space-y-12 lg:sticky lg:top-8 h-full overflow-y-auto pb-12">
          <button
            onClick={() => router.back()}
            className="text-sm font-medium text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-2"
          >
            ← Edit
          </button>
          <div className="space-y-2">
            <h1 className="font-serif text-3xl text-stone-900">Design your goal.</h1>
            <p className="text-stone-500 text-sm">Create a quiet reminder for your device.</p>
          </div>

          <div className="space-y-10">
            {/* Input Section */}
            <div className="space-y-4">
              <label htmlFor="milestone" className="block text-xs font-bold text-stone-400 uppercase tracking-widest">
                1. What is your goal?
              </label>
              <div className="relative">
                <input
                  id="milestone"
                  name="milestone"
                  type="text"
                  autoFocus
                  className="block w-full border-0 border-b-2 border-stone-200 bg-transparent py-4 px-0 text-2xl md:text-3xl font-serif text-stone-900 placeholder:text-stone-300 focus:border-stone-900 focus:ring-0 transition-colors"
                  placeholder="e.g. Healthy at 35"
                  value={milestone}
                  onChange={(e) => setMilestone(e.target.value)}
                  maxLength={40}
                />
                <p className="absolute right-0 top-4 text-xs text-stone-300">
                  {milestone.length}/40
                </p>
              </div>
            </div>

            {/* Mood Section */}
            <div className="space-y-4">
              <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest">
                2. Select a Mood
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {Object.values(MOODS).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMood(m.id)}
                    className={`group relative flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 border ${mood === m.id
                      ? "border-stone-900 bg-stone-50"
                      : "border-transparent hover:bg-white hover:shadow-sm"
                      }`}
                  >
                    <span
                      className="h-12 w-12 rounded-full shadow-sm border border-black/5 mb-3 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: m.bgColor }}
                    />
                    <span
                      className="text-xs font-medium text-stone-600 group-hover:text-stone-900"
                    >
                      {m.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Variant Section */}
            <div className="space-y-4">
              <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest">
                3. Select a Layout
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.values(VARIANTS).map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariant(v.id)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-left border ${variant === v.id
                      ? "bg-stone-900 text-white border-stone-900"
                      : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                      }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Animation Toggle */}
            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="animate"
                checked={animate}
                onChange={(e) => setAnimate(e.target.checked)}
                className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900 cursor-pointer"
              />
              <label htmlFor="animate" className="text-sm font-medium text-stone-600 cursor-pointer select-none">
                Subtle Breathing Animation
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Preview */}
        <div className="flex flex-col items-center justify-start h-full pt-8 lg:pt-20">
          <div className="w-full sticky top-8">
            <PreviewPanel
              text={milestone}
              moodId={mood}
              variantId={variant}
              animate={animate}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

