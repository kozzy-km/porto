设计的本质，是消除一切不必要的差异后，那个不得不存在的差异。
# KOZZY Portfolio — Technical Specification

## Dependencies

| Library | Version | Purpose |
|---|---|---|
| `react` | `^19.2.0` | UI framework (provided by init) |
| `react-dom` | `^19.2.0` | DOM renderer (provided by init) |
| `three` | `^0.160` | WebGL library for Hero shader |
| `@react-three/fiber` | `^8.15` | React renderer for Three.js |
| `@react-three/drei` | `^9.92` | Helpers (e.g., `useViewportSize` if needed) |
| `gsap` | `^3.12` | Core animation engine + ScrollTrigger plugin |
| `lenis` | `^1.1` | Smooth scroll with inertia |
| `lucide-react` | `^0.562.0` | Icon library (provided by init) |
| `clsx` | `^2.1.1` | Conditional classnames (provided by init) |
| `tailwind-merge` | `^3.4.0` | Tailwind class deduplication (provided by init) |

**Dev Dependencies**:
- `typescript`, `vite`, `tailwindcss`, `autoprefixer`, `postcss` (all provided by init).
- `@types/three` for TypeScript support.

---

## Component Inventory

### Layout
- `Layout`: Root wrapper. Sets up Lenis smooth scroll, GSAP ScrollTrigger integration, and global styles (cursor: none, fonts).
- `Navbar`: Fixed top nav. Scroll-aware background blur. Logo + links. Text scramble on hover.
- `CustomCursor`: Fixed position circle. Lerp-chased mouse. Scales on hover targets.
- `PageLoader`: Initial load overlay. Sequence controller for Hero reveal.
- `BackgroundGrid`: Fixed CSS/Canvas subtle perspective grid with mouse parallax.

### Sections (Pages → Sections mapping)
- `HeroSection`: Fullscreen. Wraps WebGL canvas + text content.
- `ManifestoSection`: Large text block. Word-by-word scroll highlight.
- `CapabilitiesSection`: 2x2 grid of capability cards.
- `LabSection`: Header + `NexusProject` + `GhostProject`.
- `ProcessSection`: Sticky horizontal scroll track with 4 steps.
- `ContactSection`: Big CTA + social links + footer bar.

### Reusable Components
- `TextScramble`: Wrapper component/hook. Takes a string, returns animated text on hover.
- `TerminalWindow`: macOS-style code block container (title bar + dots + content area). Used in Lab and Capabilities.
- `SyntaxHighlighter`: Renders code strings into colored spans (manual tokenizing or regex-based). Supports Python and C++ themes.
- `AnimatedNodeGraph`: SVG component for the Nexus project. Nodes, bezier edges, traveling packet dots.
- `PhoneFrame`: CSS wrapper with 3D tilt on hover. Holds the Ghost mockup image.
- `ScrollReveal`: Wrapper component. Uses GSAP ScrollTrigger to fade/slide up children.
- `TypewriterText`: Simulates typing effect for code snippets. Character-by-character reveal.

### Hooks
- `useMousePosition`: Returns smoothed (lerped) mouse coordinates via `requestAnimationFrame`.
- `useScrollProgress`: Returns normalized scroll progress for a target element (for Manifesto word highlighting).
- `useMediaQuery`: For responsive toggles (e.g., disable custom cursor on mobile).

---

## Animation Implementation

| Animation | Library / Approach | Implementation Details |
|---|---|---|
| **Smooth Scroll** | `lenis` | Initialize in `Layout`. Sync with GSAP via `lenis.on('scroll', ScrollTrigger.update)`. |
| **Hero Shader** | `@react-three/fiber` + custom GLSL | `PlaneGeometry` filling viewport. Fragment shader with simplex noise, time uniform, mouse uniform for ripple. Colors: dark indigo/cyan mix. Low brightness. |
| **Hero Text Reveal** | `gsap` | Split "KOZZY" into individual letter spans. Parent `overflow: hidden`. Animate inner spans `y: 110% → 0%` with `stagger: 0.05`, `ease: power4.out`. |
| **Page Load Sequence** | `gsap` timeline | Orchestrated in `PageLoader`. Steps: line expand → canvas fade → nav fade → hero text stagger. |
| **Scroll-Triggered Reveals** | `gsap` + `ScrollTrigger` | Default: `opacity: 0, y: 60 → opacity: 1, y: 0`. Trigger at `top 80%`. Duration `0.8s`. Used inside `ScrollReveal` wrapper. |
| **Manifesto Word Highlight** | `gsap` + `ScrollTrigger` (`scrub: true`) | Split text into word spans. Animate `color` from `--text-muted` to `--text-primary`. Sync to scroll progress over the section height. |
| **Text Scramble** | Custom React hook (`useTextScramble`) | On hover, cycle characters through `!@#$%^&*()_+-=[]{}` for `400ms`, then resolve. No external library. |
| **Custom Cursor** | Vanilla JS + `requestAnimationFrame` | Lerp factor `0.15`. Scale `1 → 4` (40px) on hover. `mix-blend-mode: difference`. Disabled on touch. |
| **Capability Cards Hover** | `gsap` or CSS transitions | `translateY(-8px)`, border-color change, box-shadow glow. Duration `0.4s`, `ease: power2.out`. |
| **Nexus Node Graph** | SVG + `gsap` | Bezier paths. `stroke-dasharray` / `stroke-dashoffset` for draw-on. A `<circle>` animated along path using `getPointAtLength`. |
| **Code Typing Effect** | `gsap` or custom hook | Iterate string characters. Append to state every `40ms`. Triggered by `ScrollTrigger` `onEnter`. |
| **Process Horizontal Scroll** | `gsap` + `ScrollTrigger` (`scrub: 1`) | Pin section. Translate inner track `x: 0 → -300vw` (desktop) or `-100vw` (tablet) based on vertical scroll progress. |
| **Contact CTA Gradient** | CSS | `background-clip: text`. Transition opacity of gradient layer on hover. |
| **Background Grid Parallax** | CSS transform or Canvas 2D | Mouse position moves grid by max `20px` via CSS `translate` on `requestAnimationFrame`. |
| **Capability Mini-Terminal** | CSS + React state | Fake `adb` log array. On hover, append lines with `setInterval`. Reset on mouse leave. |
| **Phone 3D Tilt** | CSS `transform: perspective(1000px) rotateX(...) rotateY(...)` | Calculate rotation based on mouse position relative to card center on hover. |

---

## State & Logic

- **Global**: Mouse position (for cursor, shader, tilt, grid). Managed via a single window-level mousemove listener in `Layout`.
- **Local (Component)**:
  - `PageLoader`: `isLoading` state to control overlay visibility.
  - `TypewriterText`: `displayedText` state.
  - `AnimatedNodeGraph`: `activeNode` state for hover tooltips.
  - `CapabilityCard`: `isHovered` state for terminal typing.
- **No global state management library needed** (no Zustand/Redux). React Context can be used for mouse position if prop drilling becomes an issue, but a single listener updating a ref + re-render for cursor is sufficient.

---

## Other Key Decisions

- **Routing**: Single page, no router. Anchor links (`#work`, `#lab`, etc.) handled by Lenis `scrollTo`.
- **Syntax Highlighting**: Manual CSS class injection (e.g., `<span class="token-keyword">def</span>`) rather than a heavy library like Prism.js. This keeps bundle size small and ensures the "enterprise-grade" performance.
- **WebGL**: Single canvas for the Hero section only. No post-processing. The shader is a self-contained `meshBasicMaterial` with `onBeforeCompile` or a custom `shaderMaterial`.
- **Responsive Strategy**: Mobile-first Tailwind classes. Horizontal scroll section (`Process`) disabled on mobile (`< 768px`) and rendered as vertical stack.
- **Fonts**: Loaded via Google Fonts CDN in `index.html` (`Space Grotesk`, `Inter`, `JetBrains Mono`).
