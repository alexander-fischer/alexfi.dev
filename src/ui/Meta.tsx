import Head from "next/head"
import { globalStyle } from "./style/Global"

interface MetaProps {
    title: string
}

const Meta = (props: MetaProps) => {
    const { title } = props

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto+Mono&display=swap" rel="stylesheet" />

                <title>{title}</title>
            </Head>

            {globalStyle()}
        </>
    )
}

export default Meta