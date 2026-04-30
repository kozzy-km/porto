import { useEffect, useRef, useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'

const nexusPythonCode = `from typing import TypedDict, Annotated
import operator
from langgraph.graph import StateGraph, END

class AgentState(TypedDict):
    input: str
    agent_outcome: str
    intermediate_steps: Annotated[list, operator.add]

def agent_node(state: AgentState):
    """Decide next action based on LLM reasoning."""
    return {"agent_outcome": "call_tool"}

def tool_node(state: AgentState):
    """Execute external tool and append result."""
    return {"intermediate_steps": ["tool_result"]}

# Compile the cyclic state graph
workflow = StateGraph(AgentState)
workflow.add_node("agent", agent_node)
workflow.add_node("action", tool_node)
workflow.set_entry_point("agent")
workflow.add_conditional_edges(
    "agent",
    lambda s: "continue" if s["agent_outcome"] == "call_tool" else "end",
    {"continue": "action", "end": END}
)
workflow.add_edge("action", "agent")
app = workflow.compile()`

const ghostCppCode = `#include <imgui.h>
#include <imgui_impl_android.h>
#include <android/native_window.h>
#include <EGL/egl.h>
#include <GLES3/gl3.h>

struct Settings {
    bool silent_aim = true;
    float aim_fov = 90.0f;
    bool box_esp = false;
    float esp_color[4] = {1.0f, 0.2f, 0.4f, 1.0f};
} g_settings;

void RenderGhostMenu() {
    ImGui::Begin("GHOST // CORE", nullptr,
        ImGuiWindowFlags_NoCollapse |
        ImGuiWindowFlags_AlwaysAutoResize |
        ImGuiWindowFlags_NoScrollbar);

    if (ImGui::BeginTabBar("##GhostTabs", ImGuiTabBarFlags_FittingPolicyScroll)) {
        if (ImGui::BeginTabItem("Aimbot")) {
            ImGui::Checkbox("Silent Aim", &g_settings.silent_aim);
            ImGui::SliderFloat("FOV Radius", &g_settings.aim_fov, 1.0f, 360.0f, "%.1f deg");
            ImGui::EndTabItem();
        }
        if (ImGui::BeginTabItem("ESP")) {
            ImGui::Checkbox("3D Box ESP", &g_settings.box_esp);
            ImGui::ColorEdit4("Outline Color", g_settings.esp_color);
            ImGui::EndTabItem();
        }
        ImGui::EndTabBar();
    }
    ImGui::End();
}`

import React from 'react'

function SyntaxHighlighter({ code, language }: { code: string; language: 'python' | 'cpp' }) {
  const commentColor = language === 'python' ? '#6b7280' : '#6b7280'
  const stringColor = '#a5f3fc'

  const lines = code.split('\n')

  const highlightLine = (line: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = []
    let remaining = line
    let key = 0

    // Comments
    const commentMatch = remaining.match(/^(.*?)(#.*)$/)
    if (commentMatch && language === 'python') {
      parts.push(<span key={key++}>{commentMatch[1]}</span>)
      parts.push(<span key={key++} style={{ color: commentColor }}>{commentMatch[2]}</span>)
      return parts
    }
    const cppCommentMatch = remaining.match(/^(.*?)(\/\/.*)$/)
    if (cppCommentMatch && language === 'cpp') {
      parts.push(<span key={key++}>{cppCommentMatch[1]}</span>)
      parts.push(<span key={key++} style={{ color: commentColor }}>{cppCommentMatch[2]}</span>)
      return parts
    }

    // Strings
    const stringRegex = /(".*?")/g
    let lastIndex = 0
    let match
    while ((match = stringRegex.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={key++}>{remaining.slice(lastIndex, match.index)}</span>)
      }
      parts.push(<span key={key++} style={{ color: stringColor }}>{match[0]}</span>)
      lastIndex = match.index + match[0].length
    }
    if (lastIndex < remaining.length) {
      parts.push(<span key={key++}>{remaining.slice(lastIndex)}</span>)
    }

    if (parts.length === 0) parts.push(<span key={key++}>{remaining}</span>)
    return parts
  }

  return (
    <div className="font-mono text-[11px] leading-5 text-text-secondary">
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="w-8 text-right pr-3 text-text-dim select-none shrink-0">{i + 1}</span>
          <span>{highlightLine(line)}</span>
        </div>
      ))}
    </div>
  )
}

function TypewriterCode({ code, language }: { code: string; language: 'python' | 'cpp' }) {
  const ref = useRef<HTMLDivElement>(null)
  const [typedCode, setTypedCode] = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 80%',
      onEnter: () => {
        let i = 0
        intervalRef.current = setInterval(() => {
          i++
          setTypedCode(code.slice(0, i))
          if (i >= code.length) {
            if (intervalRef.current) clearInterval(intervalRef.current)
          }
        }, 12)
      },
      once: true,
    })
    return () => {
      st.kill()
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [code])

  return (
    <div ref={ref} className="rounded-xl border border-border-subtle bg-void/80 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-subtle">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald/60" />
        </div>
        <span className="ml-3 font-mono text-[10px] text-text-muted">{language === 'python' ? 'nexus_graph.py' : 'ghost_menu.cpp'}</span>
      </div>
      <div className="p-4 overflow-x-auto">
        <SyntaxHighlighter code={typedCode} language={language} />
      </div>
    </div>
  )
}

function AnimatedNodeGraph() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const nodes = [
    { id: 'input', x: 60, y: 20, label: 'Input', color: '#475569' },
    { id: 'agent', x: 20, y: 80, label: 'Agent', color: '#818cf8' },
    { id: 'tool', x: 100, y: 80, label: 'Tool', color: '#22d3ee' },
    { id: 'output', x: 60, y: 140, label: 'Output', color: '#f1f5f9' },
  ]

  const edges = [
    { from: 'input', to: 'agent', d: 'M 60 26 Q 40 50 26 74' },
    { from: 'agent', to: 'tool', d: 'M 32 80 L 94 80' },
    { from: 'tool', to: 'output', d: 'M 100 86 Q 80 110 66 134' },
    { from: 'tool', to: 'agent', d: 'M 26 86 Q 60 60 94 74', dashed: true },
  ]

  return (
    <div className="relative w-full aspect-square max-w-[300px] mx-auto">
      <svg width="100%" height="100%" viewBox="0 0 120 160" className="overflow-visible">
        {edges.map((edge, i) => (
          <path
            key={i}
            d={edge.d}
            stroke={edge.dashed ? 'rgba(129,140,248,0.3)' : 'rgba(71,85,105,0.4)'}
            strokeWidth="1"
            strokeDasharray={edge.dashed ? '3 3' : 'none'}
            fill="none"
            opacity={0.6}
          />
        ))}
        {nodes.map((node) => (
          <g
            key={node.id}
            className="transition-transform duration-300"
            style={{ transformOrigin: `${node.x}px ${node.y}px`, transform: hoveredNode === node.id ? 'scale(1.3)' : 'scale(1)' }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle cx={node.x} cy={node.y} r="8" fill={node.color} opacity={0.2} />
            <circle cx={node.x} cy={node.y} r="4" fill={node.color} />
            <text x={node.x} y={node.y - 12} textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="JetBrains Mono">
              {node.label}
            </text>
          </g>
        ))}
        <circle r="3" fill="#818cf8">
          <animateMotion dur="3s" repeatCount="indefinite" path="M 60 26 Q 40 50 26 74" />
        </circle>
        <circle r="3" fill="#22d3ee">
          <animateMotion dur="3s" repeatCount="indefinite" path="M 60 60 Q 80 50 100 40" begin="1.5s" />
        </circle>
      </svg>
      {hoveredNode && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 glass border border-border-subtle rounded-lg px-3 py-2 text-xs font-mono text-text-secondary">
          {hoveredNode === 'agent' && 'model=gpt-4, temp=0.1'}
          {hoveredNode === 'tool' && 'func=web_search'}
          {hoveredNode === 'input' && 'user_prompt'}
          {hoveredNode === 'output' && 'final_response'}
        </div>
      )}
    </div>
  )
}

export default function LabSection() {
  const phoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const phone = phoneRef.current
    if (!phone) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = phone.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      phone.style.transform = `perspective(1000px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`
    }
    const onMouseLeave = () => {
      phone.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)'
    }

    phone.addEventListener('mousemove', onMouseMove)
    phone.addEventListener('mouseleave', onMouseLeave)
    return () => {
      phone.removeEventListener('mousemove', onMouseMove)
      phone.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <section id="lab" className="w-full py-24 md:py-32 px-6 md:px-12 bg-surface border-y border-border-subtle">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal className="mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan block mb-4">
            // The Lab
          </span>
          <h2
            className="font-display font-extrabold text-text-primary mb-4 tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
          >
            Proof of Work
          </h2>
          <p className="font-sans text-text-secondary text-lg max-w-xl leading-relaxed">
            Real tools. Real code. Real complexity, made simple. These are not mockups — these are working systems.
          </p>
        </ScrollReveal>

        {/* Project 1: Nexus */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mb-28">
          <div className="lg:col-span-3">
            <ScrollReveal>
              <div className="mb-6">
                <h3 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-2 tracking-tight">
                  NEXUS
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-indigo">
                  Agentic-AI Workflow Engine
                </span>
              </div>
              <p className="font-sans text-text-secondary leading-relaxed mb-6">
                A visual workflow engine for orchestrating LLM agents. Built to turn complex prompt chains into deployable state machines. 
                Nodes represent agents, tools, and decision gates. Data flows as typed state between asynchronous operations, 
                enabling multi-agent collaboration with full observability.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Python', 'LangGraph', 'LangChain', 'OpenAI', 'TypedDict'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 font-mono text-[10px] text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
            <div className="mt-8">
              <TypewriterCode code={nexusPythonCode} language="python" />
            </div>
          </div>
          <div className="lg:col-span-2 flex items-center justify-center">
            <ScrollReveal>
              <AnimatedNodeGraph />
            </ScrollReveal>
          </div>
        </div>

        {/* Project 2: Ghost */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-2 flex items-center justify-center order-2 lg:order-1">
            <ScrollReveal>
              <div
                ref={phoneRef}
                className="relative transition-transform duration-300 ease-out"
                style={{ willChange: 'transform' }}
              >
                <div className="rounded-[2.5rem] border-4 border-surface-elevated bg-surface-elevated p-2 shadow-2xl shadow-black/50">
                  <div className="rounded-[2rem] overflow-hidden bg-void w-[240px] md:w-[280px]">
                    <div className="w-full aspect-[9/19] bg-void relative flex flex-col">
                      {/* Status bar */}
                      <div className="h-6 flex items-center justify-between px-5 pt-2">
                        <span className="text-[8px] font-mono text-text-muted">9:41</span>
                        <div className="flex gap-1">
                          <div className="w-3 h-3 rounded-full border border-text-muted" />
                        </div>
                      </div>
                      {/* Mod menu preview */}
                      <div className="flex-1 p-3 flex items-center justify-center">
                        <div className="w-full rounded-lg overflow-hidden border border-rose/20" style={{ background: '#0f0f14' }}>
                          <div className="px-2 py-1.5 flex items-center justify-between" style={{ background: 'rgba(251,113,133,0.15)' }}>
                            <span className="font-mono text-[7px] font-bold text-rose">GHOST</span>
                            <span className="text-[7px] text-text-muted">×</span>
                          </div>
                          <div className="p-2 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[7px] text-text-secondary">Silent Aim</span>
                              <div className="w-5 h-2.5 rounded-full bg-rose relative">
                                <span className="absolute right-0.5 top-0.5 w-1.5 h-1.5 rounded-full bg-white" />
                              </div>
                            </div>
                            <div className="space-y-0.5">
                              <div className="flex justify-between font-mono text-[6px] text-text-muted">
                                <span>FOV</span>
                                <span>90°</span>
                              </div>
                              <div className="w-full h-0.5 bg-white/10 rounded-full">
                                <div className="w-1/4 h-full bg-rose rounded-full" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Home bar */}
                      <div className="h-6 flex items-center justify-center pb-2">
                        <div className="w-20 h-1 bg-text-muted/40 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-surface-elevated rounded-full" />
              </div>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-3 order-1 lg:order-2">
            <ScrollReveal>
              <div className="mb-6">
                <h3 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-2 tracking-tight">
                  GHOST
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-rose">
                  Android Modding Suite
                </span>
              </div>
              <p className="font-sans text-text-secondary leading-relaxed mb-6">
                A runtime injection framework for mobile FPS games. Features an ImGui-based overlay HUD, 
                real-time memory patching, and dynamic JNI hooking. Built for ARM64 Android with anti-detection 
                pattern scrambling and JNI cloak mechanisms to evade standard integrity checks.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['C++', 'ImGui', 'JNI', 'GLES3', 'ADB', 'Frida'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 font-mono text-[10px] text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
            <div className="mt-8">
              <TypewriterCode code={ghostCppCode} language="cpp" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
