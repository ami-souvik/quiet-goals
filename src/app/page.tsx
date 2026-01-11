import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl space-y-12">
        <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-stone-900">
          Quiet Goals.
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-stone-500 font-sans max-w-lg mx-auto">
          Turn your most important milestone into a quiet, private wallpaper.
          <span className="block mt-2 text-stone-400 text-base">No social feed. No notifications. Just focus.</span>
        </p>
        <div className="pt-8">
          <Link
            href="/create"
            className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-stone-900 bg-transparent border border-stone-200 rounded-full hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300 ease-out"
          >
            Create Wallpaper
          </Link>
        </div>
      </div>
    </main>
  );
}
