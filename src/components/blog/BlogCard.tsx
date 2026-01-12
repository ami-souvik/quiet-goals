import Link from "next/link";
import { type Blog } from "@/lib/blog";

export default function BlogCard({ blog: { slug, title, date, content } }: { blog: Blog }) {
    function markdownToPlainText() {
        return content
            // Remove code blocks
            .replace(/```[\s\S]*?```/g, "")
            // Remove inline code
            .replace(/`[^`]*`/g, "")
            // Remove images
            .replace(/!\[.*?\]\(.*?\)/g, "")
            // Remove links but keep text
            .replace(/\[([^\]]+)\]\([^)]+\)/g, "")
            // Remove headings
            .replace(/^#{1,6}\s+/gm, "")
            // Remove blockquotes
            .replace(/^>\s+/gm, "")
            // Remove emphasis
            .replace(/[*_~]/g, "")
            // Collapse newlines
            .replace(/\n+/g, " ")
            .trim();
    }

    return (
        <Link href={`/blog/${slug}`} className="block h-full group">
            <article className="h-full flex flex-col items-start justify-between p-6 bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-stone-300 transition-all duration-300 ease-in-out">
                <div className="w-full">
                    <div className="flex items-center gap-x-2 text-xs font-medium text-stone-400 mb-4 uppercase tracking-wider">
                        <time dateTime={date}>
                            {new Date(date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </div>
                    
                    <h3 className="text-xl font-serif text-stone-900 group-hover:text-stone-600 transition-colors line-clamp-2 leading-tight">
                        {title}
                    </h3>

                    <p className="mt-4 text-sm text-stone-500 line-clamp-4 leading-relaxed font-light">
                        {markdownToPlainText()}
                    </p>
                </div>
                
                <div className="mt-6 flex items-center text-sm font-medium text-stone-900 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                    Read more <span className="ml-1">→</span>
                </div>
            </article>
        </Link>
    )
}