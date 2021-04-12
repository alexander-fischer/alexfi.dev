import Head from "next/head"
import { globalStyle } from "./style/Global"

interface MetaProps {
    title: string
    description: string
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
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords ?? "Machine Learning"}/>
            </Head>

            {globalStyle()}
        </>
    )
}

export default Meta