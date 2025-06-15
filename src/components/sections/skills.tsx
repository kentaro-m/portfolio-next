import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const skillCategories = [
  {
    title: "Frontend",
    description: "Modern web technologies and frameworks",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    title: "Backend",
    description: "Server-side technologies and databases",
    skills: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "GraphQL",
    ],
  },
  {
    title: "Tools & DevOps",
    description: "Development tools and deployment platforms",
    skills: ["Git", "Docker", "AWS", "Vercel", "GitHub Actions", "Jest"],
  },
  {
    title: "Languages",
    description: "Programming languages I work with",
    skills: ["JavaScript", "TypeScript", "Python", "Go", "SQL"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Skills
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Technologies and tools I use to bring ideas to life.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[67.5rem] md:grid-cols-2">
        {skillCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
