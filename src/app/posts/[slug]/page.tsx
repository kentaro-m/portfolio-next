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
import type { MDXComponents } from "mdx/types";
import { ReactNode } from "react";
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

  const components: MDXComponents = {
    h1: ({ children }: { children: ReactNode }) => (
      <h1 className="mt-8 mb-4 text-4xl font-bold tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: { children: ReactNode }) => (
      <h2 className="mt-8 mb-4 text-3xl font-semibold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: { children: ReactNode }) => (
      <h3 className="mt-6 mb-3 text-2xl font-semibold tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: { children: ReactNode }) => (
      <h4 className="mt-6 mb-2 text-xl font-semibold tracking-tight">
        {children}
      </h4>
    ),
    p: ({ children }: { children: ReactNode }) => (
      <p className="mb-4 leading-7 [&:not(:first-child)]:mt-6">{children}</p>
    ),
    ul: ({ children }: { children: ReactNode }) => (
      <ul className="ml-6 mb-4 list-disc [&>li]:mt-2">{children}</ul>
    ),
    ol: ({ children }: { children: ReactNode }) => (
      <ol className="ml-6 mb-4 list-decimal [&>li]:mt-2">{children}</ol>
    ),
    li: ({ children }: { children: ReactNode }) => (
      <li className="leading-7">{children}</li>
    ),
    blockquote: ({ children }: { children: ReactNode }) => (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {children}
      </blockquote>
    ),
    table: ({ children }: { children: ReactNode }) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">{children}</table>
      </div>
    ),
    tr: ({ children }: { children: ReactNode }) => (
      <tr className="m-0 border-t p-0 even:bg-muted">{children}</tr>
    ),
    th: ({ children }: { children: ReactNode }) => (
      <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
        {children}
      </th>
    ),
    td: ({ children }: { children: ReactNode }) => (
      <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
        {children}
      </td>
    ),
    code: ({ children }: { children: ReactNode }) => (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
        {children}
      </code>
    ),
    pre: ({ children }: { children: ReactNode }) => (
      <pre className="mb-4 mt-6 overflow-x-auto rounded-lg bg-muted p-4">
        <code className="relative rounded bg-muted font-mono text-sm font-semibold">
          {children}
        </code>
      </pre>
    ),
    a: ({ href, children }: { href?: string; children: ReactNode }) => (
      <a
        href={href}
        className="font-medium text-primary underline underline-offset-4"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    hr: () => <hr className="my-4 md:my-8" />,
  };

  return (
    <>
      <ArticleSchema
        post={post}
        authorName="Your Name"
        siteUrl={process.env.NEXT_PUBLIC_BASE_URL || "https://yoursite.com"}
      />
      <article className="container py-8 md:py-12">
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
            components={components}
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
