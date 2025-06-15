import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    title: "Senior Software Engineer",
    company: "Tech Company",
    period: "2022 - Present",
    description:
      "Leading development of web applications using React, Next.js, and TypeScript. Mentoring junior developers and collaborating with cross-functional teams.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    title: "Software Engineer",
    company: "Startup Inc.",
    period: "2020 - 2022",
    description:
      "Developed and maintained multiple web applications. Implemented CI/CD pipelines and improved application performance.",
    technologies: ["React", "JavaScript", "Express.js", "MongoDB", "AWS"],
  },
  {
    title: "Junior Developer",
    company: "Development Agency",
    period: "2019 - 2020",
    description:
      "Built responsive websites and web applications for various clients. Gained experience in full-stack development.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
  },
];

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="container space-y-6 py-8 md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Experience
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          My professional journey and the roles that shaped my career.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-1 md:max-w-[64rem] md:grid-cols-1">
        {experiences.map((exp, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex flex-col space-y-1.5">
                <CardTitle className="text-xl">{exp.title}</CardTitle>
                <CardDescription className="text-base font-medium">
                  {exp.company} • {exp.period}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map(tech => (
                  <Badge key={tech} variant="secondary">
                    {tech}
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
