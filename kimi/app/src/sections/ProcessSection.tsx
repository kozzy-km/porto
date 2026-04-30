import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const steps = [
  {
    number: '01',
    title: 'DECONSTRUCT',
    body: 'Map the system. Identify the memory layout, the API surface, the user\'s mental model. Find the friction.',
    visual: 'exploded',
  },
  {
    number: '02',
    title: 'ARCHITECT',
    body: 'Design the state graph. Wire the nodes. Plan the hooks, the prompts, the component tree.',
    visual: 'blueprint',
  },
  {
    number: '03',
    title: 'ENGINEER',
    body: 'Write the code. Patch the memory. Compile the graph. No shortcuts.',
    visual: 'terminal',
  },
  {
    number: '04',
    title: 'POLISH',
    body: 'Add the motion. Tune the easing. Ensure every pixel justifies its existence.',
    visual: 'morph',
  },
]

function ExplodedVisual() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-40">
      <circle cx="100" cy="100" r="4" fill="#6366f1" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <line
          key={i}
          x1="100"
          y1="100"
          x2={100 + 80 * Math.cos((angle * Math.PI) / 180)}
          y2={100 + 80 * Math.sin((angle * Math.PI) / 180)}
          stroke="#6366f1"
          strokeWidth="1"
          opacity="0.5"
        />
      ))}
    </svg>
  )
}

function BlueprintVisual() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-40">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#475569" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#grid)" />
      <path d="M 20 180 Q 100 20 180 180" stroke="#06b6d4" strokeWidth="2" fill="none" strokeDasharray="5 5">
        <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite" />
      </path>
    </svg>
  )
}

function TerminalVisual() {
  return (
    <div className="w-[200px] h-[140px] bg-void border border-border-subtle rounded-lg p-3 font-mono text-[9px] text-green-400 opacity-60">
      <div className="flex flex-col gap-1">
        <span>$ make build</span>
        <span>[1/4] Compiling agent_node.cpp...</span>
        <span>[2/4] Linking libghost.so...</span>
        <span>[3/4] Generating R.java...</span>
        <span className="text-cyan">[4/4] BUILD SUCCESSFUL</span>
        <span className="animate-pulse mt-2">$ _</span>
      </div>
    </div>
  )
}

function MorphVisual() {
  return (
    <div className="w-[160px] h-[160px] flex items-center justify-center opacity-60">
      <div
        className="w-16 h-16 bg-gradient-to-br from-indigo to-cyan"
        style={{
          animation: 'morph-shape 4s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes morph-shape {
          0% { border-radius: 50%; transform: rotate(0deg); }
          50% { border-radius: 0%; transform: rotate(180deg); }
          100% { border-radius: 50%; transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

const visuals: Record<string, React.FC> = {
  exploded: ExplodedVisual,
  blueprint: BlueprintVisual,
  terminal: TerminalVisual,
  morph: MorphVisual,
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const trigger = triggerRef.current
    const track = trackRef.current
    if (!section || !trigger || !track) return

    const isMobile = window.innerWidth < 768
    if (isMobile) return // Let it stack naturally on mobile

    const scrollWidth = track.scrollWidth - window.innerWidth

    const tween = gsap.to(track, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="process" className="w-full bg-void">
      <div ref={triggerRef} className="min-h-[100dvh] flex flex-col justify-center overflow-hidden">
        <div className="px-6 md:px-12 mb-12 md:mb-20 max-w-[1400px] mx-auto w-full">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan block mb-4">// PROCESS</span>
          <h2 className="font-display font-bold text-text-primary" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            HOW I BUILD
          </h2>
        </div>

        <div ref={trackRef} className="flex flex-col md:flex-row gap-8 md:gap-0 px-6 md:px-0">
          {steps.map((step, i) => {
            const Visual = visuals[step.visual]
            return (
              <div
                key={i}
                className="md:w-screen md:min-w-[100vw] md:max-w-[100vw] flex-shrink-0 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6 md:px-20"
              >
                <div className="flex flex-col gap-4 max-w-md">
                  <span className="font-display font-bold text-[6rem] md:text-[8rem] leading-none text-text-muted opacity-30">
                    {step.number}
                  </span>
                  <h3 className="font-display font-bold text-3xl md:text-4xl text-text-primary -mt-8 relative">
                    {step.title}
                  </h3>
                  <p className="font-sans text-text-secondary leading-relaxed">
                    {step.body}
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-center w-[300px] h-[300px]">
                  <Visual />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
