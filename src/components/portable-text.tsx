import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-4 max-w-prose text-pretty text-muted leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 text-2xl font-semibold tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 text-xl font-semibold tracking-tight">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-4 border-l-2 border-border pl-4 italic text-muted">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="underline underline-offset-2 hover:text-foreground"
        rel="noreferrer"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </a>
    ),
  },
};

export function RichText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
