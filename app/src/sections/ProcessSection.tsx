import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollReveal from '../components/ScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Deconstruct',
    body: 'Map the system. Identify the memory layout, the API surface, the user\'s mental model. Find the friction points that others miss.',
    tags: ['Discovery', 'Analysis', 'Architecture'],
  },
  {
    number: '02',
    title: 'Architect',
    body: 'Design the state graph. Wire the nodes. Plan the hooks, the prompts, the component tree. Every decision is intentional.',
    tags: ['System Design', 'State Graphs', 'Wireframes'],
  },
  {
    number: '03',
    title: 'Engineer',
    body: 'Write the code. Patch the memory. Compile the graph. No shortcuts. No technical debt. Only precision.',
    tags: ['Development', 'Injection', 'Integration'],
  },
  {
    number: '04',
    title: 'Polish',
    body: 'Add the motion. Tune the easing. Ensure every pixel justifies its existence. Excellence lives in the details.',
    tags: ['Motion', 'QA', 'Optimization'],
  },
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const line = lineRef.current
    if (!section || !line) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="process" className="w-full py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal className="mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan block mb-4">
            // Process
          </span>
          <h2
            className="font-display font-extrabold text-text-primary tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
          >
            How I Build
          </h2>
          <p className="mt-4 font-sans text-text-secondary text-lg max-w-xl leading-relaxed">
            A repeatable framework for turning ambiguity into shipped product.
          </p>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo/40 to-transparent origin-top"
          />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`relative flex flex-col md:flex-row gap-8 md:gap-16 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className="flex-1 md:text-right md:pr-16 pl-14 md:pl-0">
                    <div className={`${i % 2 === 1 ? 'md:text-left md:pl-16 md:pr-0' : ''}`}>
                      <span className="font-display font-bold text-[5rem] md:text-[7rem] leading-none text-text-dim/40 block mb-2">
                        {step.number}
                      </span>
                      <h3 className="font-display font-bold text-2xl md:text-3xl text-text-primary -mt-6 mb-4 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="font-sans text-text-secondary leading-relaxed max-w-md mb-4">
                        {step.body}
                      </p>
                      <div className={`flex flex-wrap gap-2 ${i % 2 === 1 ? 'md:justify-start' : 'md:justify-end'}`}>
                        {step.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 font-mono text-[10px] text-text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Node */}
                  <div className="absolute left-6 md:left-1/2 top-0 -translate-x-1/2">
                    <div className="w-3 h-3 rounded-full bg-indigo shadow-glow" />
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
