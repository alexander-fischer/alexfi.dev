import Head from "next/head"
import Footer from "@/components/footer/Footer"
import MarkdownRenderer from "@/components/blog/MarkdownRenderer"
import { getPostSlugs, getPostData, PostMeta } from "@/lib/blog"
import { GetStaticPaths, GetStaticProps } from "next"

interface BlogPostProps {
    content: string
    meta: PostMeta
}

export default function BlogPost({ content, meta }: BlogPostProps) {
    return (
        <>
            <Head>
                <title>{meta.title}</title>
                {meta.description && (
                    <meta name="description" content={meta.description} />
                )}
            </Head>
            <main className="min-h-screen">
                <div className="container mx-auto px-4 md:px-12 max-w-[75ch] pt-8 md:pt-16 mb-16">
                    <MarkdownRenderer content={content} />
                </div>
                <Footer />
            </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = getPostSlugs()
    return {
        paths: slugs.map((slug) => ({ params: { slug } })),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string
    const { meta, content } = getPostData(slug)
    return {
        props: {
            meta,
            content,
        },
    }
}
