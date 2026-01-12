import Link from "next/link";
import * as blogs from "@/lib/blog";
import Markdown from "@/components/blog/Markdown";
import BlogCard from "@/components/blog/BlogCard";
import dynamic from "next/dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog: any = dynamic(() => import(`@/lib/blog/${slug}`), {
        loading: () => <p>Loading...</p>, // Optional: Shows a loading state
    });
    const canonicalUrl = `https://www.reflectyourvibe.in/blog/${slug}`;
    return {
        title: `${blog.title} | Quiet Goals`,
        description: blog.description ?? "Reflections on focus and calm.",
        alternates: {
            canonical: canonicalUrl,
        },
    };
}


function RelatedPost({ slug }: { slug: string }) {
    const related = Object.values(blogs).filter(b => b.slug !== slug).slice(0, 3)
    if (related.length === 0) return null;
    
    return (
        <div className="w-full flex justify-center bg-stone-50 py-16 border-t border-stone-100">
            <section className="w-full max-w-3xl md:max-w-5xl xl:max-w-6xl px-6">
                <h2 className="text-3xl font-serif text-stone-900 mb-10">More Reflections</h2>
                <ul className="grid items-stretch grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        related.map(r =>
                            <li key={r.slug}>
                                <BlogCard key={r.slug} blog={r} />
                            </li>
                        )
                    }
                </ul>
            </section>
        </div>
    )
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = (await import(`@/lib/blog/${slug}`)).default;
    if (!slug || !blog) {
        return (
            <div className="mx-auto max-w-3xl py-20 text-center text-stone-500 font-light">
                Entry not found.
            </div>
        );
    }
    return (
        <div className="bg-white min-h-screen">
            <div className="w-full flex justify-center border-b border-stone-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <nav className="w-full max-w-3xl md:max-w-5xl xl:max-w-6xl px-6 flex items-center space-x-2 text-sm font-medium text-stone-500 py-4">
                    <Link href="/" className="hover:text-stone-900 transition-colors">
                        Home
                    </Link>
                    <span className="text-stone-300">/</span>
                    <Link href="/blog" className="hover:text-stone-900 transition-colors">
                        Reflections
                    </Link>
                    <span className="text-stone-300">/</span>
                    <span className="text-stone-900 line-clamp-1">{blog.title}</span>
                </nav>
            </div>
            
            <article className="pt-12 sm:pt-16 pb-24">
                <div className="mx-auto max-w-3xl px-6">

                    {/* Header */}
                    <header className="mb-12 text-center">
                        <div className="flex items-center justify-center gap-x-2 text-sm text-stone-400 mb-4 uppercase tracking-wider font-medium">
                            <time dateTime={blog?.date}>
                                {new Date(blog?.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-stone-900 tracking-tight leading-tight">
                            {blog.title}
                        </h1>
                    </header>

                    {/* Content */}
                    <div className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:font-medium prose-p:font-light prose-p:leading-relaxed prose-a:text-stone-900 prose-a:underline prose-a:decoration-stone-300 hover:prose-a:decoration-stone-900 prose-blockquote:border-l-stone-900 prose-blockquote:font-serif prose-blockquote:italic">
                        <Markdown>
                            {blog.content}
                        </Markdown>
                    </div>

                </div>
            </article>
            <RelatedPost slug={slug} />
        </div>
    );
}