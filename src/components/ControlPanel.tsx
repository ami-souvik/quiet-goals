"use client"

import { useEffect } from "react";
import { getMood, MOODS } from "@/lib/moods";
import { fetchMoodImage } from "@/lib/images";
import { VARIANTS } from "@/lib/variants";

interface ControlPanelProps {
    text: string;
    setText: (t: string) => void;
    moodId: string;
    setMood: (t: string) => void;
    variantId: string;
    setVariant: (v: string) => void;
    animate: boolean;
    setAnimate: (v: boolean) => void;
    bgMode: 'procedural' | 'image';
    setBgMode: (bg: 'procedural' | 'image') => void;
    backgroundImage: string | null;
    setBackgroundImage: (img: string | null) => void;
    isFetchingImage: boolean;
    setIsFetchingImage: (v: boolean) => void;
}

export default function ControlPanel({
    text,
    setText,
    moodId,
    setMood,
    variantId,
    setVariant,
    animate,
    setAnimate,
    bgMode,
    setBgMode,
    backgroundImage,
    setBackgroundImage,
    isFetchingImage,
    setIsFetchingImage
}: ControlPanelProps) {
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
    return <div className="space-y-4 md:space-y-10">
        {/* Input Section */}
        <div className="space-y-2 md:space-y-4">
            <label htmlFor="milestone" className="block text-xs font-bold text-stone-400 uppercase tracking-widest">
                1. What is your goal?
            </label>
            <div className="relative">
                <input
                    id="milestone"
                    name="milestone"
                    type="text"
                    autoFocus
                    className="block w-full border-0 border-b-2 border-stone-200 bg-transparent pb-2 md:py-4 px-0 text-sm md:text-3xl font-serif text-stone-900 placeholder:text-stone-300 focus:border-stone-900 focus:ring-0 focus:outline-0 transition-colors"
                    placeholder="e.g. Healthy at 35"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={40}
                />
                <p className="absolute right-0 top-4 text-xs text-stone-300">
                    {text.length}/40
                </p>
            </div>
        </div>

        {/* Mood Section */}
        <div className="space-y-4">
            <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest">
                2. Select a Mood
            </label>
            <div className="mx-[2px] grid grid-cols-4 gap-2">
                {Object.values(MOODS).map((v) => (
                    <button
                        key={v.id}
                        type="button"
                        onClick={() => setMood(v.id)}
                        className="px-2 md:px-4 py-2 md:py-3 outline-offset-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 text-left"
                        style={{
                            color: v.textColor,
                            backgroundColor: v.bgColor,
                            outline: `1px solid ${moodId === v.id ? 'var(--color-stone-400)' : 'transparent'}`
                        }}
                    >
                        {v.label}
                    </button>
                ))}
            </div>
        </div>

        {/* Variant Section */}
        <div className="space-y-4">
            <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest">
                3. Select a Layout
            </label>
            <div className="grid grid-cols-4 gap-3">
                {Object.values(VARIANTS).map((v) => (
                    <button
                        key={v.id}
                        type="button"
                        onClick={() => setVariant(v.id)}
                        className={`px-2 md:px-4 py-2 md:py-3 rounded-lg text-xs font-medium transition-all duration-200 text-left border ${variantId === v.id
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
}