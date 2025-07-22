import { androidstudio, CopyBlock } from "react-code-blocks"

export default function Code({
    code,
    language,
}: {
    code: string
    language: string
}) {
    return (
        <CopyBlock
            text={code}
            language={language}
            showLineNumbers={true}
            theme={androidstudio}
            codeBlock
            customStyle={{ fontSize: "0.8rem", fontFamily: "var(--font-jetbrains)" }}
        />
    )
}
