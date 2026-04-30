import { useState, useCallback, useRef } from 'react'

const CHARS = '!@#$%^&*()_+-=[]{}|;:,./<>?'

export function useTextScramble(originalText: string, duration = 400) {
  const [text, setText] = useState(originalText)
  const frameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  const scramble = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    startTimeRef.current = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const revealedCount = Math.floor(progress * originalText.length)

      let result = ''
      for (let i = 0; i < originalText.length; i++) {
        if (i < revealedCount) {
          result += originalText[i]
        } else if (originalText[i] === ' ') {
          result += ' '
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      setText(result)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setText(originalText)
      }
    }
    frameRef.current = requestAnimationFrame(animate)
  }, [originalText, duration])

  const reset = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    setText(originalText)
  }, [originalText])

  return { text, scramble, reset }
}

interface TextScrambleProps {
  text: string
  className?: string
}

export default function TextScramble({ text, className = '' }: TextScrambleProps) {
  const { text: displayText, scramble, reset } = useTextScramble(text)
  return (
    <span
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {displayText}
    </span>
  )
}
