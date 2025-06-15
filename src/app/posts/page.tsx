import { getAllPosts } from "@/lib/blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Posts",
  description:
    "All blog posts and articles about web development, programming, and technology.",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col space-y-4 text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Blog Posts
        </h1>
        <p className="text-xl text-muted-foreground">
          Thoughts, tutorials, and insights about web development
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-16">
          <h2 className="text-2xl font-semibold">No posts yet</h2>
          <p className="text-muted-foreground">
            Check back soon for new content!
          </p>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <Card key={post.slug} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl line-clamp-2">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(post.date), "MMM dd, yyyy")}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readingTime}
                  </div>
                </div>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="mt-auto self-start"
                >
                  <Link href={`/posts/${post.slug}`}>Read more →</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
