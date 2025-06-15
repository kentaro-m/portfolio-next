import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArticleSchema } from "@/components/json-ld";
import rehypeHighlight from "rehype-highlight";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ArticleSchema
        post={post}
        authorName="Your Name"
        siteUrl={process.env.NEXT_PUBLIC_BASE_URL || "https://yoursite.com"}
      />
      <article className="container mx-auto py-8 md:py-12">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/posts">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Posts
            </Link>
          </Button>
        </div>

        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-xl text-muted-foreground mb-6">
              {post.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(post.date), "MMMM dd, yyyy")}
            </div>
            {post.updated && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Updated: {format(new Date(post.updated), "MMMM dd, yyyy")}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </div>
            <div>By {post.author}</div>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <Separator className="mb-8" />

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </div>

        <Separator className="my-8" />

        <footer className="text-center">
          <Button asChild>
            <Link href="/posts">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Posts
            </Link>
          </Button>
        </footer>
      </article>
    </>
  );
}
