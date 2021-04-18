import Head from "next/head"
import { globalStyle } from "./style/Global"

interface MetaProps {
    title: string
    description?: string
    keywords?: string
}

const Meta = (props: MetaProps) => {
    const { title, description, keywords } = props

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto+Mono&display=swap" rel="stylesheet" />

                <title>{title}</title>
                {description && <meta name="description" content={description} />}
                <meta name="keywords" content={keywords ?? "Machine Learning"} />

                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>

            {globalStyle()}
        </>
    )
}

export default Meta