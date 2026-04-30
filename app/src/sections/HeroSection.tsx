import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { motion } from 'framer-motion'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  
  vec2 mousePos = uMouse * aspect;
  vec2 uvAspect = uv * aspect;
  float dist = length(uvAspect - mousePos);
  float ripple = sin(dist * 20.0 - uTime * 3.0) * exp(-dist * 4.0) * 0.03;
  
  float t = uTime * 0.12;
  vec2 q = vec2(0.0);
  q.x = snoise(uv * 2.0 + vec2(t, t * 0.5));
  q.y = snoise(uv * 2.0 + vec2(1.0, t * 0.3));
  
  vec2 r = vec2(0.0);
  r.x = snoise(uv * 2.0 + q + vec2(t * 0.2, t * 0.4));
  r.y = snoise(uv * 2.0 + q + vec2(t * 0.3, t * 0.5));
  
  float f = snoise(uv * 2.0 + r + ripple);
  
  vec3 color1 = vec3(0.025, 0.025, 0.045);
  vec3 color2 = vec3(0.08, 0.08, 0.20);
  vec3 color3 = vec3(0.02, 0.15, 0.20);
  vec3 color4 = vec3(0.12, 0.08, 0.18);
  
  vec3 color = mix(color1, color2, f * 0.5 + 0.5);
  color = mix(color, color3, r.x * 0.3 + 0.2);
  color = mix(color, color4, r.y * 0.15);
  
  float vignette = 1.0 - smoothstep(0.4, 1.2, length(vUv - 0.5) * 1.5);
  color *= vignette * 0.8 + 0.2;
  
  gl_FragColor = vec4(color, 1.0);
}
`

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const { viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    }),
    []
  )

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial
      mat.uniforms.uTime.value = state.clock.elapsedTime
      
      mouseRef.current.x += (state.mouse.x * 0.5 + 0.5 - mouseRef.current.x) * 0.05
      mouseRef.current.y += (state.mouse.y * 0.5 + 0.5 - mouseRef.current.y) * 0.05
      mat.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)
    }
  })

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

const roles = [
  {
    title: 'Graphic & UI Designer',
    color: 'bg-indigo',
    glow: 'shadow-glow',
    detail: 'Design systems • Figma • Motion UI • Typography • Brand Identity',
  },
  {
    title: 'Motion Designer',
    color: 'bg-cyan',
    glow: 'shadow-glow-cyan',
    detail: 'After Effects • Lottie • GSAP • Rive • Kinetic Typography',
  },
  {
    title: 'Android Modder',
    color: 'bg-rose',
    glow: 'shadow-glow-rose',
    detail: 'JNI • Frida • ImGui • GLES3 • ARM64 • Runtime Injection',
  },
  {
    title: 'Agentic-AI Workflow Designer',
    color: 'bg-amber',
    glow: 'shadow-[0_0_40px_rgba(251,191,36,0.12)]',
    detail: 'LangGraph • CrewAI • n8n • OpenAI • State Machines • RAG',
  },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const pfpRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 })

      tl.to(labelRef.current, { opacity: 1, duration: 1, ease: 'power2.out' })
        .fromTo(
          titleRef.current?.querySelectorAll('.letter') || [],
          { y: '120%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1.4, ease: 'power4.out', stagger: 0.06 },
          '-=0.7'
        )
        .to(pfpRef.current, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, '-=1')
        .to(
          subtitleRef.current?.querySelectorAll('.role-item') || [],
          { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 },
          '-=0.6'
        )
        .to(ctaRef.current, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .to(statsRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const title = 'KOZZY'

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100dvh] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 1], fov: 75 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: false }}
          style={{ width: '100%', height: '100%' }}
        >
          <ShaderPlane />
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <span
              ref={labelRef}
              className="font-mono text-xs uppercase tracking-[0.2em] text-cyan opacity-0 block mb-6"
            >
              Creative Technologist & Digital Craftsman
            </span>

            <h1
              ref={titleRef}
              className="font-display font-extrabold text-text-primary leading-[0.9] tracking-[-0.04em] mb-10"
              style={{ fontSize: 'clamp(4rem, 14vw, 11rem)' }}
            >
              {title.split('').map((char, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <span className="letter inline-block">{char}</span>
                </span>
              ))}
            </h1>

            <div ref={subtitleRef} className="flex flex-col gap-3 mb-12">
              {roles.map((role, i) => (
                <motion.div
                  key={i}
                  className="role-item opacity-0 -translate-x-4 flex items-center gap-4 group cursor-default"
                  whileHover={{ x: 8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${role.color} ${role.glow}`} />
                  <span className="font-display font-semibold text-text-primary text-lg md:text-xl tracking-tight">
                    {role.title}
                  </span>
                  <span className="hidden md:inline font-mono text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2">
                    {role.detail}
                  </span>
                </motion.div>
              ))}
            </div>

            <a
              ref={ctaRef}
              href="#expertise"
              className="opacity-0 inline-flex items-center gap-3 font-display font-semibold text-text-primary text-lg group"
            >
              <span className="relative px-6 py-3 rounded-full border border-border-medium bg-surface/50 backdrop-blur-sm hover:border-indigo/50 transition-all duration-500">
                Explore Expertise
                <span className="absolute inset-0 rounded-full bg-indigo/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </span>
              <motion.span
                className="text-indigo"
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </a>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-8">
            <motion.div
              ref={pfpRef}
              className="opacity-0 scale-90 relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-border-medium shadow-2xl relative">
                <img
                  src="/pfp.jpg"
                  alt="KOZZY"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -inset-4 rounded-full bg-indigo/10 blur-2xl animate-pulse-glow" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-emerald border-2 border-void animate-pulse" />
            </motion.div>

            <div
              ref={statsRef}
              className="opacity-0 translate-y-4 flex flex-wrap gap-6 md:gap-10 justify-center lg:justify-end"
            >
              {[
                { value: '5+', label: 'Years Crafting' },
                { value: '60+', label: 'Projects Shipped' },
                { value: '12', label: 'Tools Mastered' },
                { value: '∞', label: 'Curiosity' },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-right">
                  <div className="font-display font-bold text-2xl md:text-3xl text-text-primary">{stat.value}</div>
                  <div className="font-mono text-xs text-text-muted uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
