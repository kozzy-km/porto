import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'

/* ==========================================
   UI DESIGNER — Floating Design System Cards
   ========================================== */
function DesignSystemVisual() {
  return (
    <div className="relative w-full h-full min-h-[260px] perspective-1000 overflow-hidden rounded-2xl">
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-36 h-24 rounded-xl shadow-xl flex flex-col p-3 gap-2"
            style={{
              background: ['rgba(129,140,248,0.15)', 'rgba(34,211,238,0.15)', 'rgba(251,113,133,0.15)', 'rgba(251,191,36,0.15)'][i],
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
            }}
            animate={{
              x: [0, 15, -10, 0],
              y: [0, -20, 10, 0],
              rotateX: [0, 10, -5, 0],
              rotateY: [0, -10, 5, 0],
            }}
            transition={{
              duration: 6 + i * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full" style={{ background: ['#818cf8', '#22d3ee', '#fb7185', '#fbbf24'][i] }} />
              <div className="flex-1 h-2 rounded bg-white/20 mt-2" />
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 rounded bg-white/10 w-full" />
              <div className="h-1.5 rounded bg-white/10 w-3/4" />
              <div className="h-1.5 rounded bg-white/10 w-1/2" />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-text-muted">
        FIGMA • TOKENS • COMPONENTS
      </div>
    </div>
  )
}

/* ==========================================
   MOTION DESIGNER — Kinetic Shapes
   ========================================== */
function MotionVisual() {
  return (
    <div className="relative w-full h-full min-h-[260px] overflow-hidden rounded-2xl flex items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200" className="overflow-visible">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="100"
          cy="100"
          r="40"
          fill="none"
          stroke="url(#grad1)"
          strokeWidth="2"
          animate={{ r: [40, 70, 40], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.rect
          x="70"
          y="70"
          width="60"
          height="60"
          rx="12"
          fill="none"
          stroke="#fb7185"
          strokeWidth="2"
          animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 0.8, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '100px 100px' }}
        />
        <motion.polygon
          points="100,60 130,110 70,110"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2"
          animate={{ rotate: [0, -120, -240, -360], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '100px 100px' }}
        />
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={i}
            cx={100 + 55 * Math.cos((i * 90 * Math.PI) / 180)}
            cy={100 + 55 * Math.sin((i * 90 * Math.PI) / 180)}
            r="4"
            fill="#22d3ee"
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
          />
        ))}
      </svg>
      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-text-muted">
        AFTER EFFECTS • GSAP • RIVE
      </div>
    </div>
  )
}

/* ==========================================
   ANDROID MODDER — Interactive ImGui Menu
   ========================================== */
function ImGuiVisual() {
  const [activeTab, setActiveTab] = useState<'aimbot' | 'esp' | 'misc'>('aimbot')
  const [silentAim, setSilentAim] = useState(true)
  const [boxEsp, setBoxEsp] = useState(false)
  const [fov, setFov] = useState(90)
  const [color, setColor] = useState({ r: 251, g: 113, b: 133 })
  const [showMenu, setShowMenu] = useState(true)

  const rgb = `rgb(${color.r},${color.g},${color.b})`

  return (
    <div className="relative w-full h-full min-h-[280px] overflow-hidden rounded-2xl flex items-center justify-center bg-[#08080c]">
      {showMenu ? (
        <div className="w-[260px] rounded-lg overflow-hidden border border-white/10 shadow-2xl" style={{ background: '#0f0f14' }}>
          {/* Title bar */}
          <div className="px-3 py-2 flex items-center justify-between" style={{ background: 'linear-gradient(90deg, rgba(251,113,133,0.2), transparent)' }}>
            <span className="font-mono text-[11px] font-bold text-rose tracking-wider">GHOST // CORE</span>
            <button onClick={() => setShowMenu(false)} className="text-text-muted hover:text-text-primary text-xs">×</button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/5">
            {(['aimbot', 'esp', 'misc'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 font-mono text-[9px] uppercase tracking-wider transition-colors ${
                  activeTab === tab ? 'text-rose bg-rose/10' : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-3 space-y-2.5">
            {activeTab === 'aimbot' && (
              <>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-text-secondary">Silent Aim</span>
                  <button
                    onClick={() => setSilentAim(!silentAim)}
                    className={`w-8 h-4 rounded-full transition-colors relative ${silentAim ? 'bg-rose' : 'bg-white/10'}`}
                  >
                    <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${silentAim ? 'left-4' : 'left-0.5'}`} />
                  </button>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[9px] text-text-muted">
                    <span>FOV Radius</span>
                    <span>{fov}°</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="360"
                    value={fov}
                    onChange={(e) => setFov(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-full accent-rose cursor-pointer"
                  />
                </div>
              </>
            )}
            {activeTab === 'esp' && (
              <>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-text-secondary">3D Box ESP</span>
                  <button
                    onClick={() => setBoxEsp(!boxEsp)}
                    className={`w-8 h-4 rounded-full transition-colors relative ${boxEsp ? 'bg-rose' : 'bg-white/10'}`}
                  >
                    <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${boxEsp ? 'left-4' : 'left-0.5'}`} />
                  </button>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-[9px] text-text-muted block">Outline Color</span>
                  <div className="flex gap-2">
                    {[
                      { r: 251, g: 113, b: 133 },
                      { r: 129, g: 140, b: 248 },
                      { r: 34, g: 211, b: 238 },
                      { r: 251, g: 191, b: 36 },
                      { r: 52, g: 211, b: 153 },
                    ].map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setColor(c)}
                        className="w-5 h-5 rounded border border-white/10 transition-transform hover:scale-110"
                        style={{ background: `rgb(${c.r},${c.g},${c.b})`, boxShadow: color.r === c.r && color.g === c.g && color.b === c.b ? `0 0 8px rgb(${c.r},${c.g},${c.b})` : 'none' }}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
            {activeTab === 'misc' && (
              <div className="font-mono text-[10px] text-text-muted py-2 text-center">
                Anti-detection • Pattern scrambler • JNI cloak
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-3 py-1.5 border-t border-white/5 flex justify-between items-center">
            <span className="font-mono text-[8px] text-text-dim">ARM64 • GLES3</span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
              <span className="font-mono text-[8px] text-emerald">LIVE</span>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowMenu(true)}
          className="px-4 py-2 rounded-lg border border-rose/30 text-rose font-mono text-xs hover:bg-rose/10 transition-all"
        >
          OPEN MOD MENU
        </button>
      )}

      {/* Preview box */}
      <div className="absolute bottom-4 right-4 w-16 h-16 border rounded" style={{ borderColor: boxEsp ? rgb : 'rgba(255,255,255,0.1)' }}>
        {boxEsp && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2" style={{ borderColor: rgb }} />
          </div>
        )}
        {silentAim && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border" style={{ borderColor: `rgba(${color.r},${color.g},${color.b},0.3)` }} />
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-text-muted">
        C++ • JNI • IMGUI • GLES3
      </div>
    </div>
  )
}

/* ==========================================
   AGENTIC-AI — Interactive Node Graph
   ========================================== */
function AgentGraphVisual() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const nodes = [
    { id: 'input', x: 60, y: 20, label: 'User Input', color: '#475569', config: 'text_query' },
    { id: 'router', x: 60, y: 65, label: 'Intent Router', color: '#fbbf24', config: 'classifier=gpt-4o' },
    { id: 'agent_a', x: 20, y: 110, label: 'Research Agent', color: '#818cf8', config: 'tools=[web_search,arxiv]' },
    { id: 'agent_b', x: 100, y: 110, label: 'Code Agent', color: '#22d3ee', config: 'tools=[interpreter,github]' },
    { id: 'synth', x: 60, y: 155, label: 'Synthesizer', color: '#fb7185', config: 'model=claude-3.5' },
    { id: 'output', x: 60, y: 200, label: 'Output', color: '#34d399', config: 'format=markdown' },
  ]

  const edges = [
    { from: 'input', to: 'router', d: 'M 60 26 L 60 59' },
    { from: 'router', to: 'agent_a', d: 'M 54 71 L 26 104' },
    { from: 'router', to: 'agent_b', d: 'M 66 71 L 94 104' },
    { from: 'agent_a', to: 'synth', d: 'M 26 116 L 54 149' },
    { from: 'agent_b', to: 'synth', d: 'M 94 116 L 66 149' },
    { from: 'synth', to: 'output', d: 'M 60 161 L 60 194' },
    { from: 'agent_a', to: 'agent_b', d: 'M 26 110 L 100 110', dashed: true },
  ]

  return (
    <div className="relative w-full h-full min-h-[260px] overflow-hidden rounded-2xl flex items-center justify-center">
      <svg ref={svgRef} width="220" height="240" viewBox="0 0 120 240" className="overflow-visible">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {edges.map((edge, i) => (
          <path
            key={i}
            d={edge.d}
            stroke={edge.dashed ? 'rgba(129,140,248,0.3)' : 'rgba(71,85,105,0.4)'}
            strokeWidth="1"
            strokeDasharray={edge.dashed ? '3 3' : 'none'}
            fill="none"
          />
        ))}

        {nodes.map((node) => (
          <g
            key={node.id}
            className="cursor-pointer"
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{
              transformOrigin: `${node.x}px ${node.y}px`,
              transform: hoveredNode === node.id ? 'scale(1.2)' : 'scale(1)',
              transition: 'transform 0.3s ease',
            }}
          >
            <circle cx={node.x} cy={node.y} r="10" fill={node.color} opacity="0.15" />
            <circle cx={node.x} cy={node.y} r="5" fill={node.color} filter={hoveredNode === node.id ? 'url(#glow)' : ''} />
            <text x={node.x} y={node.y - 14} textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="JetBrains Mono">
              {node.label}
            </text>
          </g>
        ))}

        {/* Animated packet */}
        <circle r="2.5" fill="#818cf8">
          <animateMotion dur="4s" repeatCount="indefinite" path="M 60 26 L 60 59 L 26 104 L 54 149 L 60 194" />
        </circle>
        <circle r="2.5" fill="#22d3ee">
          <animateMotion dur="3.5s" repeatCount="indefinite" path="M 60 26 L 60 59 L 94 104 L 66 149 L 60 194" begin="0.5s" />
        </circle>
      </svg>

      {hoveredNode && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 glass border border-border-subtle rounded-lg px-3 py-2 text-[10px] font-mono text-text-secondary whitespace-nowrap"
        >
          {nodes.find((n) => n.id === hoveredNode)?.config}
        </motion.div>
      )}

      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-text-muted">
        LANGGRAPH • CREWAI • N8N
      </div>
    </div>
  )
}

/* ==========================================
   MAIN EXPERTISE SECTION
   ========================================== */
const capabilities = [
  {
    title: 'Graphic & UI Designer',
    subtitle: 'Systems that speak',
    description:
      'Design systems, interface architecture, and visual languages for products that demand clarity. From atomic design tokens to full-scale component libraries, I bridge the gap between aesthetic intent and functional reality.',
    skills: ['Figma', 'Design Tokens', 'Motion UI', 'Typography', 'Accessibility', 'Prototyping'],
    accent: 'indigo',
    visual: DesignSystemVisual,
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    title: 'Motion Designer',
    subtitle: 'Static is dead',
    description:
      'Kinetic typography, 3D environments, and scroll-driven narratives that keep eyes locked. I craft motion with purpose — every animation serves the story.',
    skills: ['After Effects', 'GSAP', 'Rive', 'Lottie', 'Three.js', 'Shaders'],
    accent: 'cyan',
    visual: MotionVisual,
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Android Modder',
    subtitle: 'Break the game',
    description:
      'Runtime injection frameworks, memory patching, and custom ImGui HUDs for mobile platforms. I build tools that operate at the edge of what Android allows.',
    skills: ['C++', 'JNI', 'Frida', 'ImGui', 'GLES3', 'ARM64'],
    accent: 'rose',
    visual: ImGuiVisual,
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    title: 'Agentic-AI Workflow Designer',
    subtitle: 'Agents that think',
    description:
      'Orchestrating LLM agents, state graphs, and automated workflows that turn chaos into pipelines. I design agent architectures that reason, collaborate, and deliver.',
    skills: ['LangGraph', 'CrewAI', 'n8n', 'OpenAI', 'RAG', 'State Machines'],
    accent: 'amber',
    visual: AgentGraphVisual,
    span: 'md:col-span-2 md:row-span-1',
  },
]

const accentMap: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  indigo: { text: 'text-indigo', bg: 'bg-indigo', border: 'border-indigo/20', glow: 'hover:shadow-glow' },
  cyan: { text: 'text-cyan', bg: 'bg-cyan', border: 'border-cyan/20', glow: 'hover:shadow-glow-cyan' },
  rose: { text: 'text-rose', bg: 'bg-rose', border: 'border-rose/20', glow: 'hover:shadow-glow-rose' },
  amber: { text: 'text-amber', bg: 'bg-amber', border: 'border-amber/20', glow: 'hover:shadow-[0_0_40px_rgba(251,191,36,0.12)]' },
}

export default function ExpertiseSection() {
  return (
    <section id="expertise" className="w-full py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal className="mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan block mb-4">
            // Expertise
          </span>
          <h2
            className="font-display font-extrabold text-text-primary tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
          >
            What I Do
          </h2>
          <p className="mt-4 font-sans text-text-secondary text-lg max-w-xl leading-relaxed">
            Four disciplines. One unified craft. I don't just work across these fields — I weave them together.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[minmax(200px,auto)]">
          {capabilities.map((cap, i) => {
            const Visual = cap.visual
            const accent = accentMap[cap.accent]
            return (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                className={`${cap.span} group`}
              >
                <div
                  className={`relative h-full p-6 md:p-8 rounded-2xl bg-surface border border-border-subtle transition-all duration-700 ${accent.border} ${accent.glow} hover:-translate-y-1 hover:border-opacity-40 glow-border overflow-hidden`}
                >
                  <div className={`w-8 h-1 rounded-full ${accent.bg} mb-5`} />
                  <h3 className="font-display font-bold text-xl md:text-2xl text-text-primary mb-1 tracking-tight">
                    {cap.title}
                  </h3>
                  <p className={`font-mono text-[10px] uppercase tracking-[0.15em] ${accent.text} mb-4`}>
                    {cap.subtitle}
                  </p>
                  <p className="font-sans text-text-secondary text-sm leading-relaxed mb-5 max-w-md">
                    {cap.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {cap.skills.map((skill, j) => (
                      <span
                        key={j}
                        className="px-2 py-1 rounded-md bg-white/5 border border-white/5 font-mono text-[10px] text-text-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="relative w-full flex-1 min-h-[180px] rounded-xl overflow-hidden border border-border-subtle/50 bg-void/50">
                    <Visual />
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
