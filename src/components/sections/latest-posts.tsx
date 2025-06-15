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
import { getLatestPosts } from "@/lib/blog";
import { format } from "date-fns";

export function LatestPostsSection() {
  const posts = getLatestPosts(5);

  if (posts.length === 0) {
    return (
      <section id="blog" className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Latest Posts
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Recent thoughts and tutorials from my blog.
          </p>
          <p className="text-muted-foreground">
            No posts yet. Check back soon!
          </p>
          <Button asChild>
            <Link href="/posts">View All Posts</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Latest Posts
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Recent thoughts and tutorials from my blog.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-1 md:max-w-[67.5rem] md:grid-cols-2 lg:grid-cols-3">
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
                  {post.tags.slice(0, 3).map(tag => (
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
      <div className="text-center">
        <Button asChild>
          <Link href="/posts">View All Posts</Link>
        </Button>
      </div>
    </section>
  );
}
