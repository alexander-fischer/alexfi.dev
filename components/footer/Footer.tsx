export default function Footer() {
    return (
        <footer className="py-8">
            <div className="container mx-auto px-4 max-w-2xl md:max-w-4xl">
                <div className="flex items-center">
                    <a
                        href="/"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200 mr-4"
                    >
                        Alexander Fischer © {new Date().getFullYear()}
                    </a>
                    <a
                        href="/imprint"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
                    >
                        Imprint
                    </a>
                </div>
            </div>
        </footer>
    )
}
