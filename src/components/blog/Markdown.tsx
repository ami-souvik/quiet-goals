import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm"

export default function Markdown({ children }: { children: string }) {
    return <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
            h1: ({ children }) => (
                <h1 className="mt-8 mb-4 text-3xl font-serif font-medium text-stone-900">
                    {children}
                </h1>
            ),
            h2: ({ children }) => (
                <h2 className="mt-8 mb-4 text-2xl font-serif font-medium text-stone-900">
                    {children}
                </h2>
            ),
            h3: ({ children }) => (
                <h3 className="mt-6 mb-3 text-xl font-serif font-medium text-stone-900">
                    {children}
                </h3>
            ),
            p: ({ children }) => (
                <p className="mt-4 leading-relaxed text-stone-600">
                    {children}
                </p>
            ),
            ul: ({ children }) => (
                <ul className="mt-4 list-disc list-inside text-stone-600 space-y-1">
                    {children}
                </ul>
            ),
            ol: ({ children }) => (
                <ol className="mt-4 list-decimal list-inside text-stone-600 space-y-1">
                    {children}
                </ol>
            ),
            li: ({ children }) => (
                <li className="pl-1">
                    {children}
                </li>
            ),
            blockquote: ({ children }) => (
                <blockquote className="mt-6 border-l-2 border-stone-900 pl-4 italic text-stone-500 font-serif bg-stone-50 py-2 pr-4 rounded-r-lg">
                    {children}
                </blockquote>
            ),
            a: ({ href, children }) => (
                <a
                    href={href}
                    className="text-stone-900 underline decoration-stone-300 hover:decoration-stone-900 transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {children}
                </a>
            ),
            hr: () => <hr className='my-8 border-t border-stone-200' />
        }}>
        {children}
    </ReactMarkdown>
}