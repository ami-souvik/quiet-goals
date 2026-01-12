import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16 md:py-40 text-center bg-stone-50">
      <div className="max-w-3xl space-y-14">
        {/* Hero */}
        <header className="space-y-6">
          <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-stone-900">
            Quiet Goals
          </h1>
          <h2 className="text-xl md:text-2xl text-stone-600 font-sans leading-relaxed max-w-2xl mx-auto">
            Turn your most important milestone into a calm, private wallpaper.
          </h2>
        </header>

        {/* Value proposition */}
        <section className="space-y-6 max-w-xl mx-auto">
          <p className="text-lg leading-relaxed text-stone-500">
            Your phone is the screen you look at the most.
            Quiet Goals helps you place one meaningful goal there —
            gently, without noise or distraction.
          </p>

          <p className="text-base text-stone-400">
            No social feed. No notifications. No performance.
            Just a quiet reminder of what you’re working toward.
          </p>
        </section>

        {/* CTA */}
        <div className="pt-6">
          <Link
            href="/create"
            className="group relative inline-flex items-center justify-center px-10 py-3 text-sm font-medium text-stone-900 bg-transparent border border-stone-300 rounded-full hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300 ease-out"
          >
            Create your wallpaper
          </Link>
        </div>

        {/* Examples Section */}
        <section className="pt-20 pb-10 w-full">
            <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-10">
                Examples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
                {/* Calm Example */}
                <div className="aspect-[9/16] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 relative group transition-transform hover:-translate-y-1 duration-300">
                    <div className="absolute inset-0 bg-[#F0F4F8] flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#F0F4F8] to-[#D9E2EC] opacity-50"></div>
                        <span className="relative z-10 font-sans text-[#486581] text-2xl font-normal tracking-wide">
                            Breathe Deeply
                        </span>
                    </div>
                </div>

                {/* Focused Example */}
                <div className="aspect-[9/16] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 relative group transition-transform hover:-translate-y-1 duration-300">
                    <div className="absolute inset-0 bg-[#FFFFFF] flex items-center justify-center p-6">
                         <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] to-[#F3F4F6] opacity-50"></div>
                        <span className="relative z-10 font-sans text-[#111827] text-2xl font-medium tracking-tight">
                            Write Daily
                        </span>
                    </div>
                </div>

                {/* Ambitious Example */}
                <div className="aspect-[9/16] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 relative group transition-transform hover:-translate-y-1 duration-300">
                    <div className="absolute inset-0 bg-[#000000] flex items-center justify-center p-6">
                         <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#000000] opacity-80"></div>
                        <span className="relative z-10 font-sans text-white text-3xl font-bold uppercase tracking-widest">
                            BUILD THE FUTURE
                        </span>
                    </div>
                </div>
            </div>
        </section>

        {/* Subtle SEO footer text */}
        <footer className="pt-12 space-y-6">
          <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
            Quiet Goals is a minimalist tool for creating personal milestone wallpapers
            designed for focus, clarity, and calm.
          </p>
          
          <div className="pt-2">
            <Link 
              href="/blog" 
              className="text-xs font-medium text-stone-500 hover:text-stone-900 border-b border-stone-200 hover:border-stone-900 transition-all duration-300"
            >
              Read Reflections
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
