import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Youtube, MessageCircle, Mail, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
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
    <section ref={sectionRef} id="contact" className="w-full min-h-[90vh] flex flex-col justify-center items-center px-6 md:px-12 py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-surface/30 to-void pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="font-display font-extrabold text-center leading-none mb-8"
          style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)' }}
        >
          <span className="text-gradient animate-gradient-shift bg-[length:200%_200%]">
            Let's Build
          </span>
        </h2>

        <p className="font-sans text-text-secondary text-lg md:text-xl text-center max-w-lg mx-auto mb-4 leading-relaxed">
          Have a complex problem? I have a simple solution.
        </p>
        <p className="font-sans text-text-muted text-sm text-center max-w-md mx-auto mb-16">
          Open for collaborations, contract work, and interesting conversations about the future of interface, motion, and intelligence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <motion.a
            href="mailto:hello@kozzy.dev"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-indigo text-void font-display font-semibold text-lg hover:bg-indigo/90 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={20} />
            Get In Touch
            <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0" />
          </motion.a>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 mb-20 justify-center">
          <motion.a
            href="https://youtube.com/@the_kozzy"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-4 w-[260px] h-[110px] bg-surface border border-border-subtle rounded-2xl transition-all duration-500 hover:border-indigo/30 hover:shadow-glow"
            whileHover={{ y: -4 }}
          >
            <Youtube size={24} className="text-text-secondary group-hover:text-indigo transition-all duration-500" />
            <div className="flex flex-col text-left">
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">YouTube</span>
              <span className="font-sans font-medium text-text-primary">@the_kozzy</span>
            </div>
          </motion.a>

          <motion.a
            href="#"
            className="group flex items-center justify-center gap-4 w-[260px] h-[110px] bg-surface border border-border-subtle rounded-2xl transition-all duration-500 hover:border-cyan/30 hover:shadow-glow-cyan"
            whileHover={{ y: -4 }}
          >
            <MessageCircle size={24} className="text-text-secondary group-hover:text-cyan transition-all duration-500" />
            <div className="flex flex-col text-left">
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Discord</span>
              <span className="font-sans font-medium text-text-primary">.kozzy.km</span>
            </div>
          </motion.a>
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-mono text-[10px] text-text-dim tracking-wider">
          © 2025 KOZZY. ALL RIGHTS RESERVED.
        </span>
        <span className="font-mono text-[10px] text-text-dim tracking-wider">
          DESIGNED & BUILT WITH REACT • THREE.JS • GSAP • LOVE
        </span>
      </div>
    </section>
  )
}
