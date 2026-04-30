import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

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

// Simplex 2D noise
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
  
  // Mouse ripple influence
  vec2 mousePos = uMouse * aspect;
  vec2 uvAspect = uv * aspect;
  float dist = length(uvAspect - mousePos);
  float ripple = sin(dist * 20.0 - uTime * 3.0) * exp(-dist * 4.0) * 0.03;
  
  // Fluid noise layers
  float t = uTime * 0.15;
  vec2 q = vec2(0.0);
  q.x = snoise(uv * 2.0 + vec2(t, t * 0.5));
  q.y = snoise(uv * 2.0 + vec2(1.0, t * 0.3));
  
  vec2 r = vec2(0.0);
  r.x = snoise(uv * 2.0 + q + vec2(t * 0.2, t * 0.4));
  r.y = snoise(uv * 2.0 + q + vec2(t * 0.3, t * 0.5));
  
  float f = snoise(uv * 2.0 + r + ripple);
  
  // Colors: dark indigo and cyan
  vec3 color1 = vec3(0.04, 0.04, 0.08); // deep void
  vec3 color2 = vec3(0.15, 0.15, 0.35); // dark indigo
  vec3 color3 = vec3(0.02, 0.20, 0.25); // dark cyan
  
  vec3 color = mix(color1, color2, f * 0.5 + 0.5);
  color = mix(color, color3, r.x * 0.3 + 0.2);
  
  // Subtle vignette
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
      
      // Smooth mouse lerp
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

export default function HeroBackground() {
  return (
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
  )
}
