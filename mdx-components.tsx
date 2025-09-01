import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom heading components
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold element-spacing">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold element-spacing">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold element-spacing">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold element-spacing">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base font-semibold element-spacing">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-sm font-semibold element-spacing">{children}</h6>
    ),
    
    // Paragraph
    p: ({ children }) => (
      <p className="element-spacing text-foreground leading-relaxed">{children}</p>
    ),
    
    // Lists
    ul: ({ children }) => (
      <ul className="element-spacing list-disc list-inside space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="element-spacing list-decimal list-inside space-y-1">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-foreground">{children}</li>
    ),
    
    // Links
    a: ({ href, children }) => (
      <a 
        href={href} 
        className="text-primary hover:text-primary/80 underline transition-colors"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    
    // Code
    code: ({ children }) => (
      <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="bg-muted p-5 rounded-lg overflow-x-auto element-spacing">
        <code className="text-sm font-mono">{children}</code>
      </pre>
    ),
    
    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-5 border-primary pl-5 element-spacing italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    
    // Horizontal rule
    hr: () => (
      <hr className="border-border element-spacing" />
    ),
    
    // Strong and emphasis
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-muted-foreground">{children}</em>
    ),
    
    ...components,
  }
}
