import BlogPreview from "@/components/blog/BlogPreview"
import Divider from "@/components/elements/Divider"
import Footer from "@/components/footer/Footer"
import Head from "next/head"
import { GetStaticProps } from "next"
import { getAllPosts, PostMeta } from "@/lib/blog"

interface HomeProps {
    posts: PostMeta[]
}

export default function Home({ posts }: HomeProps) {
    return (
        <>
            <Head>
                <title>Alexander Fischer</title>
                <meta
                    name="description"
                    content="Alex is a Berlin-based ML engineer focused on sustainable AI with specialized small language models. Experienced in fine-tuning, efficient deployment, and bridging machine learning with robust software using Python and TypeScript."
                />
            </Head>

            <main className="min-h-screen">
                <div className="container mx-auto px-4 max-w-[75ch]">
                    <div className="rounded-lg p-8 pt-12 flex flex-col items-center text-center">
                        <div>
                            <h1 className="text-3xl font-bold">
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

                    <p className="mt-6 text-base leading-relaxed">
                        Hi, my name is Alex 👋
                        <br className="mb-1" />
                        I'm a Berlin-based machine learning engineer / data
                        scientist with a passion for building and optimizing
                        specialized small language models.
                        <br className="mb-1" />
                        My current focus is on fine-tuning language models for
                        specific applications, making them more efficient and
                        sustainable - both in terms of compute and environmental
                        impact.
                        <br className="mb-1" />
                        I have hands-on experience developing robust,
                        production-ready AI systems, from prototyping to
                        deployment, and I'm particularly interested in making AI
                        accessible on edge devices.
                        <br className="mb-1" />
                        My background in software engineering (mainly Python and
                        TypeScript) allows me to bridge the gap between advanced
                        machine learning research and practical, scalable
                        solutions.
                        <br className="mb-1" />I care about responsible AI and
                        am always exploring ways to make machine learning more
                        sustainable and impactful.
                    </p>

                    <Divider />

                    <div className="text-3xl font-bold mt-12 text-center">
                        Articles
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-8">
                        {posts.map((post) => (
                            <BlogPreview
                                key={post.slug}
                                link={`/blog/${post.slug}`}
                                title={post.title}
                                description={post.description}
                            />
                        ))}
                    </div>
                </div>

                <Footer />
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const posts = getAllPosts()
    return {
        props: {
            posts,
        },
    }
}
