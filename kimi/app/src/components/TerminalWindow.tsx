import { type ReactNode } from 'react'

interface TerminalWindowProps {
  title: string
  children: ReactNode
  className?: string
}

export default function TerminalWindow({ title, children, className = '' }: TerminalWindowProps) {
  return (
    <div className={`rounded-xl overflow-hidden border border-border-subtle bg-surface shadow-xl ${className}`}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle bg-void/50">
        <div className="w-3 h-3 rounded-full bg-rose" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-4 font-mono text-xs text-text-muted">{title}</span>
      </div>
      <div className="p-4 md:p-6 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed">{children}</pre>
      </div>
    </div>
  )
}
