import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollReveal from '../components/ScrollReveal'

gsap.registerPlugin(ScrollTrigger)

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        let obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => setCount(Math.floor(obj.val)),
        })
      },
      once: true,
    })
    return () => st.kill()
  }, [target])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

const stats = [
  { value: 60, suffix: '+', label: 'Projects Delivered', description: 'From mobile mods to enterprise AI pipelines' },
  { value: 5, suffix: '+', label: 'Years Experience', description: 'Self-taught, continuously evolving' },
  { value: 12, suffix: '', label: 'Tools Mastered', description: 'Figma to Frida, After Effects to LangGraph' },
  { value: 100, suffix: '%', label: 'Passion Driven', description: 'Every project is a craft, not a task' },
]

const tools = [
  'Figma', 'After Effects', 'Blender', 'C++', 'Python', 'React', 'Three.js',
  'GSAP', 'Frida', 'ImGui', 'LangGraph', 'n8n', 'LangChain', 'OpenAI',
  'Rive', 'Lottie', 'Jetpack Compose', 'JNI', 'GLES3',
]

export default function StatsSection() {
  return (
    <section className="w-full py-24 md:py-32 px-6 md:px-12 bg-surface border-y border-border-subtle">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-24">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="text-center lg:text-left">
                <div className="font-display font-extrabold text-4xl md:text-5xl text-text-primary mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-cyan mb-2">
                  {stat.label}
                </div>
                <p className="font-sans text-sm text-text-muted leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
              // Toolkit
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, i) => (
              <motion.span
                key={i}
                className="px-3 py-1.5 rounded-full border border-border-subtle bg-void/50 font-mono text-xs text-text-secondary hover:text-text-primary hover:border-indigo/30 transition-all duration-300 cursor-default"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
