import { useEffect, useState } from 'react'
import { ExternalLink, MessageCircle } from 'lucide-react'
import TextScramble from './TextScramble'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'WORK', href: '#lab' },
    { label: 'LAB', href: '#lab' },
    { label: 'PROCESS', href: '#process' },
    { label: 'CONTACT', href: '#contact' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
          scrolled ? 'bg-void/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <a href="#" className="font-display font-bold text-xl text-text-primary tracking-tight">
          KOZZY<span className="text-cyan">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans font-medium text-sm uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors"
            >
              <TextScramble text={link.label} />
            </a>
          ))}
          <div className="w-px h-4 bg-border-subtle mx-2" />
          <a
            href="https://youtube.com/@the_kozzy?si=m-y-9oENp_0CxzlL"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ExternalLink size={14} />
            <span className="font-mono text-xs uppercase tracking-wider">YOUTUBE</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <MessageCircle size={14} />
            <span className="font-mono text-xs uppercase tracking-wider">DISCORD</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-text-primary transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-text-primary transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-text-primary transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-void/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display font-medium text-2xl text-text-primary"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-6 mt-8">
            <a
              href="https://youtube.com/@the_kozzy?si=m-y-9oENp_0CxzlL"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary"
            >
              <ExternalLink size={24} />
            </a>
            <a href="#" className="text-text-secondary hover:text-text-primary">
              <MessageCircle size={24} />
            </a>
          </div>
        </div>
      )}
    </>
  )
}
