interface IBlogPreview {
    link: string
    title: string
    description: string
}

export default function BlogPreview({ link, title, description }: IBlogPreview) {
    return (
        <div className="mt-8 mb-8">
            <a href={link}>
                <div className="text-standard">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <a>Read more!</a>
                </div>
            </a>
        </div>
    )
}