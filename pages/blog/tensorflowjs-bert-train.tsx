import Code from "@/components/elements/Code"
import Footer from "@/components/footer/Footer"
import Head from "next/head"
import ReactMarkdown from "react-markdown"
import fs from "fs"
import path from "path"

interface TFJSBertTrainProps {
    content: string
}

export default function TFJSBertTrain({ content }: TFJSBertTrainProps) {
    return (
        <>
            <Head>
                <title>Browser BERT</title>
                <meta
                    name="description"
                    content="Learn how to train a BERT classifier directly in your browser using TensorFlow.js. This comprehensive tutorial covers setting up BERT, converting models, and training a spam classifier with high accuracy. Ideal for developers looking to explore machine learning applications on the web."
                />
            </Head>
            <main className="min-h-screen">
                <div className="container mx-auto px-4 md:px-12 max-w-2xl md:max-w-4xl pt-8 md:pt-16 mb-16">
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
                                    className="underline hover:text-blue-600 dark:hover:text-blue-400"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    {...props}
                                />
                            ),
                            code({ node, inline, className, children, ...props }: any) {
                                const match = /language-(\w+)/.exec(className || "")
                                return !inline && match ? (
                                    <Code
                                        code={String(children).replace(/\n$/, "")}
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
                </div>

                <Footer />
            </main>
        </>
    )
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), "content/blog/tensorflowjs-bert-train.md")
    const content = await fs.promises.readFile(filePath, "utf8")
    return { props: { content } }
}
