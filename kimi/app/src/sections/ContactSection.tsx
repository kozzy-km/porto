import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Youtube, MessageCircle } from 'lucide-react'

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="w-full min-h-[80vh] flex flex-col justify-center items-center px-6 md:px-12 py-24 bg-void">
      <h2
        ref={titleRef}
        className="font-display font-bold text-center leading-none mb-8 group"
        style={{ fontSize: 'clamp(4rem, 15vw, 12rem)' }}
      >
        <span className="relative inline-block text-text-primary transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-indigo group-hover:to-cyan group-hover:bg-clip-text group-hover:text-transparent">
          LET'S BUILD
        </span>
      </h2>

      <p className="font-sans text-text-secondary text-lg md:text-xl text-center max-w-md mb-16">
        Have a complex problem? I have a simple solution.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 mb-24">
        <a
          href="https://youtube.com/@the_kozzy?si=m-y-9oENp_0CxzlL"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center gap-4 w-[280px] h-[120px] bg-surface border border-border-subtle rounded-2xl transition-all duration-500 hover:border-indigo/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)]"
        >
          <Youtube size={28} className="text-text-secondary group-hover:text-indigo transition-all duration-500 group-hover:rotate-12" />
          <div className="flex flex-col">
            <span className="font-mono text-xs uppercase tracking-wider text-text-muted">YOUTUBE</span>
            <span className="font-sans font-medium text-text-primary">@the_kozzy</span>
          </div>
        </a>

        <a
          href="#"
          className="group flex items-center justify-center gap-4 w-[280px] h-[120px] bg-surface border border-border-subtle rounded-2xl transition-all duration-500 hover:border-cyan/40 hover:shadow-[0_0_40px_rgba(6,182,212,0.1)]"
        >
          <MessageCircle size={28} className="text-text-secondary group-hover:text-cyan transition-all duration-500 group-hover:rotate-12" />
          <div className="flex flex-col">
            <span className="font-mono text-xs uppercase tracking-wider text-text-muted">DISCORD</span>
            <span className="font-sans font-medium text-text-primary">.kozzy.km</span>
          </div>
        </a>
      </div>

      <div className="w-full max-w-[1400px] mx-auto pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-mono text-xs text-text-muted">© 2025 KOZZY. ALL RIGHTS RESERVED.</span>
        <span className="font-mono text-xs text-text-muted">DESIGNED & BUILT WITH REACT + THREE.JS</span>
      </div>
    </section>
  )
}
