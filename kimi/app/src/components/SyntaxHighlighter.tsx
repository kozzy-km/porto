import { type ReactNode } from 'react'

interface SyntaxHighlighterProps {
  code: string
  language: 'python' | 'cpp'
}

function highlightPython(code: string): ReactNode[] {
  const lines = code.split('\n')
  return lines.map((line, i) => {
    const parts: ReactNode[] = []
    let remaining = line
    let key = 0

    const patterns = [
      { regex: /^(\s*#.*)$/, className: 'token-comment' },
      { regex: /\b(def|class|return|if|else|elif|for|while|import|from|as|try|except|with|lambda|pass|raise|yield|async|await|True|False|None)\b/, className: 'token-keyword' },
      { regex: /\b(str|int|float|bool|list|dict|tuple|set|TypedDict|Annotated|operator|END)\b/, className: 'token-type' },
      { regex: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/, className: 'token-string' },
      { regex: /\b\d+(?:\.\d+)?\b/, className: 'token-number' },
      { regex: /\b([a-zA-Z_]\w*)\s*(?=\()/, className: 'token-function' },
      { regex: /[{}[\]();:.,=+\-*\/<>!&|]/, className: 'token-operator' },
    ]

    while (remaining.length > 0) {
      let matched = false
      for (const pattern of patterns) {
        const match = remaining.match(pattern.regex)
        if (match && match.index === 0) {
          parts.push(
            <span key={`${i}-${key++}`} className={pattern.className}>
              {match[0]}
            </span>
          )
          remaining = remaining.slice(match[0].length)
          matched = true
          break
        }
      }
      if (!matched) {
        parts.push(<span key={`${i}-${key++}`}>{remaining[0]}</span>)
        remaining = remaining.slice(1)
      }
    }

    return (
      <div key={i} className="table-row">
        <span className="table-cell pr-4 text-text-muted select-none text-right w-8">{i + 1}</span>
        <span className="table-cell">{parts}</span>
      </div>
    )
  })
}

function highlightCpp(code: string): ReactNode[] {
  const lines = code.split('\n')
  return lines.map((line, i) => {
    const parts: ReactNode[] = []
    let remaining = line
    let key = 0

    const patterns = [
      { regex: /^(\s*\/\/.*)$/, className: 'token-comment' },
      { regex: /\b(include|struct|class|public|private|protected|virtual|static|const|return|if|else|for|while|bool|float|int|void|char|auto|using|namespace|typename|template)\b/, className: 'token-keyword' },
      { regex: /"(?:[^"\\]|\\.)*"/, className: 'token-string' },
      { regex: /\b\d+(?:\.\d+f?)?\b/, className: 'token-number' },
      { regex: /\b([a-zA-Z_]\w*)\s*(?=\()/, className: 'token-function' },
      { regex: /[{}[\]();:.,=+\-*\/<>!&|]/, className: 'token-operator' },
    ]

    while (remaining.length > 0) {
      let matched = false
      for (const pattern of patterns) {
        const match = remaining.match(pattern.regex)
        if (match && match.index === 0) {
          parts.push(
            <span key={`${i}-${key++}`} className={pattern.className}>
              {match[0]}
            </span>
          )
          remaining = remaining.slice(match[0].length)
          matched = true
          break
        }
      }
      if (!matched) {
        parts.push(<span key={`${i}-${key++}`}>{remaining[0]}</span>)
        remaining = remaining.slice(1)
      }
    }

    return (
      <div key={i} className="table-row">
        <span className="table-cell pr-4 text-text-muted select-none text-right w-8">{i + 1}</span>
        <span className="table-cell">{parts}</span>
      </div>
    )
  })
}

export default function SyntaxHighlighter({ code, language }: SyntaxHighlighterProps) {
  const highlighted = language === 'python' ? highlightPython(code) : highlightCpp(code)
  return <div className="table w-full">{highlighted}</div>
}
