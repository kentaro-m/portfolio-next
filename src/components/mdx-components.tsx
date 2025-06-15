import type { MDXComponents } from "mdx/types";
import { ReactNode } from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
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
    ...components,
  };
}
