import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, MessageCircle, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Expertise', href: '#expertise' },
    { label: 'Lab', href: '#lab' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 md:px-12 transition-all duration-700 ${
          scrolled ? 'glass border-b border-border-subtle' : 'bg-transparent'
        }`}
      >
        <a href="#" className="font-display font-bold text-xl text-text-primary tracking-tight">
          KOZZY<span className="text-indigo">.</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative font-sans font-medium text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <div className="w-px h-4 bg-border-medium" />
          <a
            href="https://youtube.com/@the_kozzy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-text-secondary hover:text-indigo transition-colors duration-300"
          >
            <ExternalLink size={14} />
            <span className="font-mono text-xs uppercase tracking-wider">YT</span>
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 text-text-secondary hover:text-cyan transition-colors duration-300"
          >
            <MessageCircle size={14} />
            <span className="font-mono text-xs uppercase tracking-wider">DC</span>
          </a>
        </div>

        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-border-subtle text-text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 glass-strong flex flex-col items-center justify-center gap-8 md:hidden pt-20"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="font-display font-medium text-3xl text-text-primary"
              >
                {link.label}
              </motion.a>
            ))}
            <div className="flex gap-6 mt-8">
              <a
                href="https://youtube.com/@the_kozzy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-indigo"
              >
                <ExternalLink size={24} />
              </a>
              <a href="#contact" className="text-text-secondary hover:text-cyan">
                <MessageCircle size={24} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
