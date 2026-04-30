declare module 'lenis' {
  class Lenis {
    constructor(options?: { lerp?: number; smoothWheel?: boolean })
    on(event: string, callback: (...args: any[]) => void): void
    raf(time: number): void
    destroy(): void
  }
  export default Lenis
}

declare module 'gsap' {
  const gsap: any
  export default gsap
}

declare module 'gsap/ScrollTrigger' {
  const ScrollTrigger: any
  export { ScrollTrigger }
}
