import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  content: string;
  readingTime: string;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(postsDirectory)
    .filter(file => file.endsWith(".md") || file.endsWith(".mdx"));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.mdx?$/, "");
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
      const mdxPath = path.join(postsDirectory, `${realSlug}.mdx`);
      if (!fs.existsSync(mdxPath)) {
        return null;
      }
      return getPostFromPath(mdxPath, realSlug);
    }

    return getPostFromPath(fullPath, realSlug);
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

function getPostFromPath(fullPath: string, slug: string): BlogPost {
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const readingTimeResult = readingTime(content);

  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    updated: data.updated,
    author: data.author || "Your Name",
    tags: data.tags || [],
    content,
    readingTime: readingTimeResult.text,
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug.replace(/\.mdx?$/, "")))
    .filter((post): post is BlogPost => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}

export function getLatestPosts(limit: number = 5): BlogPost[] {
  return getAllPosts().slice(0, limit);
}
