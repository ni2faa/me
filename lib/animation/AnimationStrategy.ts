/**
 * AnimationStrategy - Interface Segregation: Focused interface for animation
 * Open/Closed: New animation strategies can be added without modifying existing code
 */
export interface IAnimationStrategy {
  initialize(element: HTMLElement): () => void // Returns cleanup function
}

/**
 * ReducedMotionStrategy - Strategy for reduced motion preference
 * Single Responsibility: Handles reduced motion animation
 */
export class ReducedMotionStrategy implements IAnimationStrategy {
  initialize(element: HTMLElement): () => void {
    element.classList.add('visible')
    return () => {} // No cleanup needed
  }
}

/**
 * IntersectionObserverStrategy - Strategy for intersection-based animation
 * Single Responsibility: Handles intersection observer animation
 */
export class IntersectionObserverStrategy implements IAnimationStrategy {
  constructor(
    private threshold: number = 0.5,
    private onVisible?: (element: HTMLElement) => void
  ) {}

  initialize(element: HTMLElement): () => void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            if (this.onVisible) {
              this.onVisible(entry.target as HTMLElement)
            }
          }
        })
      },
      { threshold: this.threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }
}

