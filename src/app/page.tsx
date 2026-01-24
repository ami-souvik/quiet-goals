import Link from "next/link";

export default function Home() {
   return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16 md:py-26 text-center bg-stone-50">
         <div className="max-w-3xl space-y-4 md:space-y-14">
            {/* Hero */}
            <div className="space-y-6">
               <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-stone-900">
                  Quiet Goals
               </h1>
               <h2 className="text-xl md:text-2xl text-stone-600 font-sans leading-relaxed max-w-2xl mx-auto">
                  Turn your most important milestone<br />into a calm, private wallpaper.
               </h2>
            </div>

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
                  Milestones
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
                  {/* Calm Example */}
                  <div className="aspect-[9/16] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 relative group transition-transform hover:-translate-y-1 duration-300">
                     <div className="absolute inset-0 bg-[#F0F4F8] flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#F0F4F8] to-[#D9E2EC] opacity-50"></div>
                        <span className="relative z-10 font-sans text-[#486581] text-2xl font-normal tracking-wide">
                           Write Daily
                        </span>
                     </div>
                  </div>

                  {/* Focused Example */}
                  <div className="aspect-[9/16] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 relative group transition-transform hover:-translate-y-1 duration-300">
                     <div className="absolute inset-0 bg-[#FFFFFF] flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] to-[#F3F4F6] opacity-50"></div>
                        <span className="relative z-10 font-sans text-[#111827] text-2xl font-medium tracking-tight">
                           Get Fit by 30
                        </span>
                     </div>
                  </div>

                  {/* Ambitious Example */}
                  <div className="aspect-[9/16] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 relative group transition-transform hover:-translate-y-1 duration-300">
                     <div className="absolute inset-0 bg-[#000000] flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#000000] opacity-80"></div>
                        <span className="relative z-10 font-sans text-white text-3xl font-bold uppercase tracking-widest">
                           SHIP LANDING PAGE
                        </span>
                     </div>
                  </div>
               </div>
            </section>

            {/* All You Need to Know Section */}
            <section className="pt-24 pb-12 w-full max-w-2xl mx-auto text-left">
               <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-10 text-center">
                  All you need to know
               </h3>
               <div className="space-y-12">
                  <div>
                     <h4 className="font-serif text-xl text-stone-900 mb-2">Is it private?</h4>
                     <p className="text-stone-600 leading-relaxed font-light">
                        Completely. Your goal is generated entirely in your browser. No data is sent to our servers. No cookies. No tracking. It stays between you and your screen.
                     </p>
                  </div>
                  <div>
                     <h4 className="font-serif text-xl text-stone-900 mb-2">Why wallpapers?</h4>
                     <p className="text-stone-600 leading-relaxed font-light">
                        On average, we unlock our phones 150 times a day. That’s 150 opportunities for a gentle nudge. A wallpaper is passive, non-intrusive, and always there.
                     </p>
                  </div>
                  <div>
                     <h4 className="font-serif text-xl text-stone-900 mb-2">The Philosophy</h4>
                     <p className="text-stone-600 leading-relaxed font-light">
                        Most apps scream for attention. Quiet Goals whispers. We believe that true focus doesn't need notifications—it just needs clarity.
                     </p>
                  </div>
               </div>
            </section>

            {/* Minimalist Footer */}
            <footer className="w-full border-t border-stone-200 pt-12 pb-8">
               <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-stone-500">
                  <p>© {new Date().getFullYear()} Quiet Goals.</p>

                  <nav className="flex gap-6">
                     <Link href="/blog" className="hover:text-stone-900 transition-colors">Reflections</Link>
                     <a href="#" className="hover:text-stone-900 transition-colors cursor-not-allowed opacity-50" title="Coming soon">Twitter</a>
                     <Link href="/privacy" className="hover:text-stone-900 transition-colors">Privacy</Link>
                  </nav>
               </div>
               <p className="mt-8 text-xs text-stone-400 font-light">
                  Designed for focus. Built with silence.
               </p>
            </footer>
         </div>
      </main>
   );
}
