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
