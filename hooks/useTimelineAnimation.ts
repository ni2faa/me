'use client'

import { useEffect, useRef } from 'react'
import { IAnimationStrategy, ReducedMotionStrategy, IntersectionObserverStrategy } from '@/lib/animation/AnimationStrategy'
import { ParallaxService } from '@/lib/animation/ParallaxService'

/**
 * useTimelineAnimation - Single Responsibility: Manages timeline item animation
 * Dependency Inversion: Uses animation strategy abstraction
 * Open/Closed: Can be extended with new animation strategies
 */
export function useTimelineAnimation(elementRef: React.RefObject<HTMLElement | null>) {
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let strategy: IAnimationStrategy
    let cleanupAnimation: () => void
    let cleanupParallax: () => void

    if (prefersReducedMotion) {
      strategy = new ReducedMotionStrategy()
    } else {
      strategy = new IntersectionObserverStrategy(0.5, () => {
        hasAnimated.current = true
        // Initialize parallax when visible
        const parallaxService = new ParallaxService(element)
        cleanupParallax = parallaxService.initialize()
      })
    }

    cleanupAnimation = strategy.initialize(element)

    return () => {
      cleanupAnimation()
      if (cleanupParallax) {
        cleanupParallax()
      }
    }
  }, [elementRef])
}

