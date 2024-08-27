import "@/styles/normalize.css"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Poppins } from "next/font/google"

const font = Poppins({ subsets: ["latin"], weight: "300" })

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main
            className={`${font.className} bg-slate-50 dark:bg-slate-900 text-gray-800 dark:text-gray-100`}
        >
            <Component {...pageProps} />
        </main>
    )
}
