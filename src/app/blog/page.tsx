import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import * as blogs from "@/lib/blog";

export const metadata = {
    title: "Reflections | Quiet Goals",
    description: "Thoughts on focus, calm, and intentional living.",
};

export default function Blog() {
    return (
        <div className="min-h-screen bg-stone-50">
            <div className="w-full flex justify-center bg-white border-b border-stone-100">
                <nav className="w-full py-4 max-w-3xl md:max-w-5xl xl:max-w-6xl px-6 flex items-center space-x-2 text-sm font-medium text-stone-500">
                    <Link href="/" className="hover:text-stone-900 transition-colors">
                        Home
                    </Link>
                    <span className="text-stone-300">/</span>
                    <span className="text-stone-900">Reflections</span>
                </nav>
            </div>
            
            <div className="w-full flex justify-center py-12 md:py-20">
                <section className="w-full max-w-3xl md:max-w-5xl xl:max-w-6xl px-6">
                    <div className="mb-16 max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 tracking-tight">
                            Quiet Reflections
                        </h1>
                        <p className="text-lg text-stone-600 leading-relaxed font-light">
                            Explore thoughts on maintaining focus, finding calm in chaos, and building a life of intention.
                        </p>
                    </div>

                    <ul className="grid items-stretch grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {
                            Object.entries(blogs).map(([k, v]) =>
                                <li key={k}>
                                    <BlogCard key={v.slug} blog={v} />
                                </li>
                            )
                        }
                    </ul>
                </section>
            </div>
        </div>
    );
}
