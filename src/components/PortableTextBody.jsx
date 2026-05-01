import { PortableText } from '@portabletext/react';

/**
 * Renders a Sanity Portable Text array to HTML that matches the tags
 * already targeted by legal.css — no style changes required.
 */
const components = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h3:     ({ children }) => <h3>{children}</h3>,
  },
  marks: {
    strong: ({ children })       => <strong>{children}</strong>,
    em:     ({ children })       => <em>{children}</em>,
    code:   ({ children })       => <code>{children}</code>,
    link:   ({ value, children }) => (
      <a href={value?.href} target={value?.href?.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

export function PortableTextBody({ value }) {
  if (!value || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
