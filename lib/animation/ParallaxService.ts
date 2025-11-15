/**
 * ParallaxService - Single Responsibility: Manages parallax effects
 * Dependency Inversion: Works with any HTMLElement, not tied to specific component
 */
export class ParallaxService {
  private needsUpdate = false
  private width = 0
  private readonly BREAKPOINT = 960

  constructor(private element: HTMLElement) {
    this.width = window.innerWidth
  }

  initialize(): () => void {
    const onScroll = () => {
      if (this.needsUpdate) return
      this.needsUpdate = true
      requestAnimationFrame(() => this.applyParallax())
    }

    const onResize = () => {
      this.width = window.innerWidth
      onScroll()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    this.applyParallax()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }

  private applyParallax(): void {
    this.needsUpdate = false

    if (this.width <= this.BREAKPOINT) return
    if (!this.element.classList.contains('visible')) return

    const h = window.innerHeight
    const c = h / 2
    const rect = this.element.getBoundingClientRect()
    const y = rect.top + rect.height / 2
    const d = y - c
    const ty = Math.max(-14, Math.min(14, (d / c) * 14))
    const s = 1 + Math.max(-0.02, Math.min(0.02, (-Math.abs(d) / h) * 0.04))

    this.element.style.setProperty('--ty', `${ty.toFixed(2)}px`)
    this.element.style.setProperty('--s', s.toFixed(3))
  }
}

