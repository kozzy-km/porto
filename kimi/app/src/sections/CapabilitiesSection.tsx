import { useState, useEffect, useRef } from 'react'
import ScrollReveal from '../components/ScrollReveal'

const capabilities = [
  {
    title: 'GRAPHIC & UI',
    subtitle: 'Systems that speak',
    description: 'Design systems, interfaces, and visual languages for products that demand clarity.',
    accent: 'indigo',
    visual: 'geometric',
  },
  {
    title: 'MOTION',
    subtitle: 'Static is dead',
    description: 'Kinetic typography, 3D environments, and scroll-driven narratives that keep eyes locked.',
    accent: 'cyan',
    visual: 'blob',
  },
  {
    title: 'ANDROID MODDING',
    subtitle: 'Break the game',
    description: 'Runtime injection, memory patching, and custom ImGui HUDs for mobile platforms.',
    accent: 'rose',
    visual: 'terminal',
  },
  {
    title: 'AGENTIC-AI',
    subtitle: 'Agents that think',
    description: 'Orchestrating LLM agents, state graphs, and automated workflows that turn chaos into pipelines.',
    accent: 'indigo',
    visual: 'nodes',
  },
]

const accentClasses: Record<string, { border: string; shadow: string; text: string; bg: string }> = {
  indigo: { border: 'hover:border-indigo/40', shadow: 'hover:shadow-[0_0_40px_rgba(99,102,241,0.1)]', text: 'text-indigo', bg: 'bg-indigo' },
  cyan: { border: 'hover:border-cyan/40', shadow: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.1)]', text: 'text-cyan', bg: 'bg-cyan' },
  rose: { border: 'hover:border-rose/40', shadow: 'hover:shadow-[0_0_40px_rgba(225,29,72,0.1)]', text: 'text-rose', bg: 'bg-rose' },
}

function GeometricVisual() {
  return (
    <div className="relative w-full h-32 mt-4 rounded-xl overflow-hidden border border-border-subtle">
      <img src="/assets/aether_ui_mockup.png" alt="UI Design System" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}

function BlobVisual() {
  return (
    <div className="relative w-full h-32 mt-4 rounded-xl overflow-hidden border border-border-subtle">
      <img src="/assets/pulse_motion_visual.png" alt="Motion Design" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}

function TerminalVisual() {
  const [lines, setLines] = useState<string[]>(['> adb devices'])
  const [hovered, setHovered] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const allLines = [
    'List of devices attached',
    'emulator-5554\tdevice',
    '> adb shell',
    ':/ $ su',
    ':/ # cd /data/data/com.game/lib',
    ':/data/.../lib # ls -la',
    '-rw-r--r-- libgame.so',
    '> frida-ps -U | grep game',
    '12345  GameProcess',
    '> ./inject --pid 12345',
    '[+] Hook attached successfully',
    '[+] ImGui context initialized',
  ]

  useEffect(() => {
    if (hovered) {
      let idx = 1
      intervalRef.current = setInterval(() => {
        if (idx < allLines.length) {
          setLines((prev) => [...prev, allLines[idx]])
          idx++
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current)
        }
      }, 400)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setLines(['> adb devices'])
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [hovered])

  return (
    <div
      className="relative w-full h-32 mt-4 rounded-lg bg-void/80 border border-border-subtle p-3 font-mono text-[10px] text-green-400 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col gap-0.5">
        {lines.map((line, i) => (
          <span key={i} className="block truncate">{line}</span>
        ))}
        <span className="animate-pulse">_</span>
      </div>
    </div>
  )
}

function NodeVisual() {
  return (
    <div className="relative w-full h-32 mt-4 flex items-center justify-center">
      <svg width="120" height="80" viewBox="0 0 120 80" className="overflow-visible">
        <circle cx="20" cy="40" r="6" fill="#475569" />
        <circle cx="60" cy="20" r="6" fill="#6366f1" />
        <circle cx="60" cy="60" r="6" fill="#06b6d4" />
        <circle cx="100" cy="40" r="6" fill="#f8fafc" />
        <path d="M 20 40 Q 40 20 60 20" stroke="#475569" strokeWidth="1" fill="none" />
        <path d="M 20 40 Q 40 60 60 60" stroke="#475569" strokeWidth="1" fill="none" />
        <path d="M 60 20 Q 80 30 100 40" stroke="#6366f1" strokeWidth="1" fill="none" />
        <path d="M 60 60 Q 80 50 100 40" stroke="#06b6d4" strokeWidth="1" fill="none" />
        <path d="M 60 20 Q 50 40 60 60" stroke="#6366f1" strokeWidth="1" fill="none" strokeDasharray="2 2" />
        <circle r="3" fill="#6366f1">
          <animateMotion dur="3s" repeatCount="indefinite" path="M 20 40 Q 40 20 60 20 Q 80 30 100 40" />
        </circle>
        <circle r="3" fill="#06b6d4">
          <animateMotion dur="3s" repeatCount="indefinite" path="M 60 60 Q 80 50 100 40" begin="1.5s" />
        </circle>
      </svg>
    </div>
  )
}

const visuals: Record<string, React.FC> = {
  geometric: GeometricVisual,
  blob: BlobVisual,
  terminal: TerminalVisual,
  nodes: NodeVisual,
}

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className="w-full py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan block mb-4">// CAPABILITIES</span>
          <h2 className="font-display font-bold text-text-primary" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            WHAT I DO
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => {
            const Visual = visuals[cap.visual]
            const accent = accentClasses[cap.accent]
            return (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div
                  className={`group relative p-8 md:p-10 rounded-2xl bg-surface border border-border-subtle transition-all duration-500 ${accent.border} ${accent.shadow} hover:-translate-y-2`}
                >
                  <div className={`w-10 h-1 rounded-full ${accent.bg} mb-6`} />
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-1">
                    {cap.title}
                  </h3>
                  <p className={`font-mono text-xs uppercase tracking-wider ${accent.text} mb-4`}>
                    {cap.subtitle}
                  </p>
                  <p className="font-sans text-text-secondary leading-relaxed">
                    {cap.description}
                  </p>
                  <Visual />
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
