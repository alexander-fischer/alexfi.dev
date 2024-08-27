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
        <div className="rounded-lg p-6 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-300">
            <Link href={link} className="block">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                    {title}
                </h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                    {description}
                </p>
            </Link>
        </div>
    )
}
