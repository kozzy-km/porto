import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import HeroBackground from '../components/HeroBackground'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })

      tl.to(labelRef.current, { opacity: 1, duration: 1, ease: 'power2.out' })
        .fromTo(
          titleRef.current?.querySelectorAll('.letter') || [],
          { y: '110%' },
          { y: '0%', duration: 1.2, ease: 'power4.out', stagger: 0.05 },
          '-=0.6'
        )
        .to(
          subtitleRef.current?.querySelectorAll('.line') || [],
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
          '-=0.8'
        )
        .to(ctaRef.current, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const title = 'KOZZY'
  const lines = [
    { text: 'Graphic & UI Designer', color: 'bg-indigo' },
    { text: 'Motion Designer', color: 'bg-cyan' },
    { text: 'Android Modder', color: 'bg-rose' },
    { text: 'Agentic-AI Architect', color: 'bg-indigo' },
  ]

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100dvh] flex items-center overflow-hidden"
    >
      <HeroBackground />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-32">
        <span
          ref={labelRef}
          className="font-mono text-xs uppercase tracking-widest text-cyan opacity-0 block mb-6"
        >
          // Creative Technologist
        </span>

        <h1 ref={titleRef} className="font-display font-bold text-text-primary leading-[0.9] tracking-[-0.03em] mb-8"
          style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}>
          {title.split('').map((char, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="letter inline-block">{char}</span>
            </span>
          ))}
        </h1>

        <div ref={subtitleRef} className="flex flex-col gap-3 mb-12">
          {lines.map((line, i) => (
            <div key={i} className="line opacity-0 translate-y-[30px] flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${line.color}`} />
              <span className="font-sans text-text-secondary text-lg md:text-xl">
                {line.text}
              </span>
            </div>
          ))}
        </div>

        <a
          ref={ctaRef}
          href="#lab"
          className="opacity-0 inline-flex items-center gap-2 font-sans font-medium text-text-primary text-lg group"
        >
          <span className="relative">
            EXPLORE THE LAB
            <span className="absolute bottom-0 left-0 w-0 h-px bg-text-primary transition-all duration-500 group-hover:w-full" />
          </span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  )
}
