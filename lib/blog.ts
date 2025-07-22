import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface PostMeta {
    slug: string
    title: string
    description: string
}

const postsDirectory = path.join(process.cwd(), "content/blog")

export function getPostSlugs(): string[] {
    return fs
        .readdirSync(postsDirectory)
        .filter((file) => file.endsWith(".md"))
        .map((file) => file.replace(/\.md$/, ""))
}

export function getPostData(slug: string): { meta: PostMeta; content: string } {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)
    const meta: PostMeta = {
        slug,
        title: data.title || slug,
        description: data.description || "",
    }
    return { meta, content }
}

export function getAllPosts(): PostMeta[] {
    return getPostSlugs().map((slug) => getPostData(slug).meta)
}
