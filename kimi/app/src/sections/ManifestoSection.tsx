import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])

  const text = "I don't just design interfaces. I dismantle complexity and rebuild it into intuition."
  const words = text.split(' ')

  const specialWords: Record<number, { style: string; color: string }> = {
    3: { style: 'italic', color: 'text-text-secondary' }, // design
    6: { style: 'font-medium', color: 'text-rose' },       // complexity
    10: { style: 'font-bold', color: 'text-cyan' },       // intuition
  }

  const specialColors: Record<number, string> = {
    6: '#e11d48',
    10: '#06b6d4',
    3: '#94a3b8',
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const spans = wordsRef.current
      if (spans.length === 0) return

      gsap.set(spans, { color: '#475569' })

      spans.forEach((span, i) => {
        const targetColor = specialColors[i] || '#f8fafc'
        gsap.to(span, {
          color: targetColor,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
          delay: i * 0.02,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="w-full py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-[900px] mx-auto">
        <p className="font-display text-text-primary leading-[1.4]" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)' }}>
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => { if (el) wordsRef.current[i] = el }}
              className={`inline-block mr-[0.3em] ${specialWords[i]?.style || ''}`}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
