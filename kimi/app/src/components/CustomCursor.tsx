import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const mouse = useRef({ x: -100, y: -100 })
  const pos = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      setHidden(true)
      return
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (hidden) setHidden(false)
    }

    const onMouseEnter = () => setHidden(false)
    const onMouseLeave = () => setHidden(true)

    const onElementHover = () => setHovered(true)
    const onElementLeave = () => setHovered(false)

    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', onElementHover)
        el.addEventListener('mouseleave', onElementLeave)
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    const interval = setInterval(addListeners, 1000)
    addListeners()

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${hovered ? 4 : 1})`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      clearInterval(interval)
      cancelAnimationFrame(rafRef.current)
    }
  }, [hovered, hidden])

  if (hidden) return null

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-[10px] h-[10px] bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{ willChange: 'transform' }}
    />
  )
}
