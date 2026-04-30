import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import ManifestoSection from './sections/ManifestoSection'
import ExpertiseSection from './sections/ExpertiseSection'
import LabSection from './sections/LabSection'
import ProcessSection from './sections/ProcessSection'
import StatsSection from './sections/StatsSection'
import ContactSection from './sections/ContactSection'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerFn)
    }
  }, [])

  return (
    <div className="relative bg-void min-h-screen selection:bg-indigo/25 selection:text-text-primary">
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <ManifestoSection />
        <ExpertiseSection />
        <LabSection />
        <ProcessSection />
        <StatsSection />
        <ContactSection />
      </main>
    </div>
  )
}

export default App
