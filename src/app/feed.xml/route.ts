import { Feed } from "feed";
import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yoursite.com";
  const posts = getAllPosts();

  const feed = new Feed({
    title: "Your Name - Blog",
    description: "Thoughts, tutorials, and insights about web development",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Your Name`,
    updated: new Date(),
    generator: "Next.js using Feed for Node.js",
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
      json: `${siteUrl}/feed.json`,
      atom: `${siteUrl}/atom.xml`,
    },
    author: {
      name: "Your Name",
      email: "your.email@example.com",
      link: siteUrl,
    },
  });

  posts.forEach(post => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/posts/${post.slug}`,
      link: `${siteUrl}/posts/${post.slug}`,
      description: post.description,
      content: post.content,
      author: [
        {
          name: post.author,
          email: "your.email@example.com",
          link: siteUrl,
        },
      ],
      date: new Date(post.date),
      category: post.tags.map(tag => ({ name: tag })),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
