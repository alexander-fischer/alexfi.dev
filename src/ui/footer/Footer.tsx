interface IFooter {
    showHome?: boolean
}

export default function Footer({ showHome }: IFooter) {
    return (
        <div className="container mx-auto max-w-xl h-32">
            <div className="flex items-center h-100">
                {showHome && <a href="/" className="text-mediumgray mx-4">Home</a>}
                <a href="/contact" className="text-mediumgray mx-4">Contact</a>
            </div>
        </div>
    )
}