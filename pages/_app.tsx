import "@/styles/normalize.css"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
})
const jetbrains = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains",
    display: "swap",
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main
            className={`${inter.variable} ${jetbrains.variable} font-sans bg-white dark:bg-[#121212] text-[#111111] dark:text-[#E0E0E0]`}
        >
            <Component {...pageProps} />
            <Analytics />
            <SpeedInsights />
        </main>
    )
}
