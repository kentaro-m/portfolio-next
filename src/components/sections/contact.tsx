import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, MessageSquare, Linkedin } from "lucide-react";
import Link from "next/link";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="container space-y-6 py-8 md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Get in Touch
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          I&apos;m always interested in new opportunities and collaborations.
          Let&apos;s connect!
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-1 md:max-w-[64rem] md:grid-cols-3">
        <Card>
          <CardHeader className="text-center">
            <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
            <CardTitle>Email</CardTitle>
            <CardDescription>
              Send me an email for any inquiries
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild>
              <Link href="mailto:your.email@example.com">Send Email</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Linkedin className="h-12 w-12 mx-auto mb-4 text-primary" />
            <CardTitle>LinkedIn</CardTitle>
            <CardDescription>Connect with me professionally</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button variant="outline" asChild>
              <Link
                href="https://linkedin.com/in/kentaro-m"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-primary" />
            <CardTitle>Twitter</CardTitle>
            <CardDescription>
              Follow me for updates and thoughts
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button variant="outline" asChild>
              <Link
                href="https://twitter.com/kentaro_m"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
