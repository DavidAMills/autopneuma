'use client'

/**
 * Simple markdown renderer component
 * TODO: Replace with react-markdown once npm install issues are resolved
 * For now, this provides basic markdown-like formatting
 */

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const renderLine = (line: string, index: number) => {
    // Headings
    if (line.startsWith('# ')) {
      return (
        <h1 key={index} className="text-4xl font-bold mb-4 mt-8 first:mt-0">
          {line.slice(2)}
        </h1>
      )
    }
    if (line.startsWith('## ')) {
      return (
        <h2 key={index} className="text-3xl font-bold mb-4 mt-8">
          {line.slice(3)}
        </h2>
      )
    }
    if (line.startsWith('### ')) {
      return (
        <h3 key={index} className="text-2xl font-bold mb-3 mt-6">
          {line.slice(4)}
        </h3>
      )
    }

    // Blockquotes
    if (line.startsWith('> ')) {
      return (
        <blockquote
          key={index}
          className="border-l-4 border-navy pl-4 italic my-4 text-navy/80"
        >
          {line.slice(2)}
        </blockquote>
      )
    }

    // Horizontal rule
    if (line.startsWith('---')) {
      return <hr key={index} className="my-8 border-navy/20" />
    }

    // List items with bold
    if (line.startsWith('- **') && line.includes('**')) {
      const boldMatch = line.match(/- \*\*(.*?)\*\*(.*)/)
      if (boldMatch) {
        return (
          <li key={index} className="mb-2 ml-6">
            <strong className="text-navy">{boldMatch[1]}</strong>
            {boldMatch[2]}
          </li>
        )
      }
    }

    // Regular list items
    if (line.startsWith('- ')) {
      return (
        <li key={index} className="mb-2 ml-6">
          {line.slice(2)}
        </li>
      )
    }

    // Numbered lists
    if (line.match(/^\d+\./)) {
      return (
        <li key={index} className="mb-2 ml-6 list-decimal">
          {line.replace(/^\d+\.\s*/, '')}
        </li>
      )
    }

    // Italic emphasis (for scripture references, etc.)
    if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
      return (
        <p key={index} className="italic text-muted-foreground mb-4">
          {line.slice(1, -1)}
        </p>
      )
    }

    // Empty lines
    if (line.trim() === '') {
      return <div key={index} className="h-4" />
    }

    // Regular paragraphs
    return (
      <p key={index} className="mb-4 leading-relaxed">
        {line}
      </p>
    )
  }

  const lines = content.split('\n')

  return (
    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-navy prose-a:text-navy prose-a:no-underline hover:prose-a:underline prose-strong:text-navy prose-li:marker:text-navy">
      {lines.map((line, index) => renderLine(line, index))}
    </div>
  )
}
