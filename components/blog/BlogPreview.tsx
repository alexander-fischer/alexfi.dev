import Link from "next/link"

interface IBlogPreview {
    link: string
    title: string
    description: string
}

export default function BlogPreview({
    link,
    title,
    description,
}: IBlogPreview) {
    return (
        <div className="rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
            <Link href={link} className="block hover:no-underline">
                <h3 className="text-lg font-semibold text-[color:var(--text)] transition-colors duration-200">
                    {title}
                </h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                    {description}
                </p>
            </Link>
        </div>
    )
}
