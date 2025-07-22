import Footer from "@/components/footer/Footer"
import ImprintContent from "@/markdown/imprint.mdx"
import { MDXComponents } from "mdx/types"

function CustomH1({ children }: any) {
    return (
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {children}
        </h1>
    )
}

function CustomH2({ children }: any) {
    return (
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2 mt-8">
            {children}
        </h2>
    )
}

function CustomParagraph({ children }: any) {
    return (
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
            {children}
        </p>
    )
}

const overrideComponents: MDXComponents = {
    h1: CustomH1,
    h2: CustomH2,
    p: CustomParagraph,
}

export default function Imprint() {
    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 max-w-2xl md:max-w-4xl pt-8 md:pt-16 pb-8">
                <ImprintContent components={overrideComponents} />
            </div>
            <Footer />
        </main>
    )
}
