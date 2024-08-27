import BlogPreview from "@/components/blog/BlogPreview"
import Divider from "@/components/elements/Divider"
import Footer from "@/components/footer/Footer"

export default function Home() {
    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 max-w-2xl md:max-w-4xl">
                <div className="rounded-lg p-8 pt-12 flex flex-col items-center text-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                            Alexander Fischer
                        </h1>
                        <h2 className="text-xl text-gray-600 dark:text-gray-300 mt-2">
                            Data Scientist | AI Expert
                        </h2>
                        <div className="mt-4 flex justify-center space-x-6">
                            <a
                                href="https://github.com/alexander-fischer"
                                target="_blank"
                                className="transition transform hover:scale-110"
                            >
                                <img
                                    src="/github.svg"
                                    alt="GitHub"
                                    className="w-6 h-6 dark:invert"
                                />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/alexfi/"
                                target="_blank"
                                className="transition transform hover:scale-110"
                            >
                                <img
                                    src="/linkedin.svg"
                                    alt="LinkedIn"
                                    className="w-6 h-6 dark:invert"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                <p className="mt-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    Hi, my name is Alex 👋 <br />
                    I'm a Berlin-based machine learning engineer / data
                    scientist specializing in large language models (LLMs) and
                    retrieval-augmented generation (RAG) applications, with a
                    broad background in general machine learning. I specialize
                    in fine-tuning LLMs and exploring their applications on edge
                    devices, leveraging their capabilities for innovative
                    solutions. Additionally, I have extensive experience in
                    software engineering, particularly with Python and
                    TypeScript, allowing me to bridge the gap between machine
                    learning and robust software development.
                </p>

                <Divider />

                <div className="text-3xl font-bold mt-12 text-center text-gray-800 dark:text-gray-100">
                    Articles
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8">
                    <BlogPreview
                        link="/blog/tensorflowjs-bert-train"
                        title="Browser BERT"
                        description="Discover how to harness the power of BERT directly in your browser with TensorflowJS! Learn step-by-step how to build and train a simple text classifier."
                    />
                </div>
            </div>

            <Footer />
        </main>
    )
}
