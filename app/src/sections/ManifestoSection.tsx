import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])

  const text = "I don't just design interfaces — I engineer experiences that dismantle complexity and rebuild it into pure intuition."
  const words = text.split(' ')

  const specialWords: Record<number, { style: string; color: string }> = {
    4: { style: 'italic', color: 'text-text-secondary' },
    8: { style: 'font-semibold', color: 'text-rose' },
    15: { style: 'font-bold', color: 'text-indigo' },
  }

  const specialColors: Record<number, string> = {
    8: '#fb7185',
    15: '#818cf8',
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const spans = wordsRef.current
      if (spans.length === 0) return

      gsap.set(spans, { color: '#334155' })

      spans.forEach((span, i) => {
        const targetColor = specialColors[i] || '#f1f5f9'
        gsap.to(span, {
          color: targetColor,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
          delay: i * 0.015,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="w-full py-32 md:py-48 px-6 md:px-12 relative">
      <div className="max-w-[1000px] mx-auto">
        <p className="font-display text-text-primary leading-[1.35]" style={{ fontSize: 'clamp(1.6rem, 3.8vw, 3.2rem)' }}>
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => { if (el) wordsRef.current[i] = el }}
              className={`inline-block mr-[0.35em] ${specialWords[i]?.style || ''}`}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
