import ReactMarkdown from 'react-markdown'
import Code from '@/components/elements/Code'

export default function MarkdownRenderer({ content }: { content: string }) {
    return (
        <ReactMarkdown
            components={{
                h1: (props) => (
                    <h1
                        className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6"
                        {...props}
                    />
                ),
                h2: (props) => (
                    <h2
                        className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mt-8 mb-4"
                        {...props}
                    />
                ),
                p: (props) => (
                    <p
                        className="mt-6 mb-4 leading-relaxed text-gray-700 dark:text-gray-300"
                        {...props}
                    />
                ),
                a: ({ node, ...props }) => (
                    <a
                        className="underline text-accent hover:opacity-80"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                    />
                ),
                code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                        <Code
                            code={String(children).replace(/\n$/, '')}
                            language={match[1]}
                        />
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    )
                },
            }}
        >
            {content}
        </ReactMarkdown>
    )
}
