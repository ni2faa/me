'use client'

import { useEffect, useRef, useState } from 'react'
import { SkillCard } from './SkillCard'
import type { Skill } from '@/data/skillsData'

interface SkillsCarouselProps {
  skills: Skill[]
  categoryHeading: string
}

export function SkillsCarousel({ skills, categoryHeading }: SkillsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-scroll on mobile
  useEffect(() => {
    if (!isMobile || skills.length <= 1) return

    const startAutoScroll = () => {
      autoScrollIntervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % skills.length)
      }, 4000) // Change every 4 seconds
    }

    startAutoScroll()

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
      }
    }
  }, [isMobile, skills.length])

  // Handle touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      // Swipe left - next
      setCurrentIndex((prev) => (prev + 1) % skills.length)
    } else if (distance < -minSwipeDistance) {
      // Swipe right - previous
      setCurrentIndex((prev) => (prev - 1 + skills.length) % skills.length)
    }

    touchStartX.current = 0
    touchEndX.current = 0
  }

  // Calculate visible items
  const itemsPerView = isMobile ? 1 : 3
  const maxIndex = isMobile 
    ? skills.length - 1 
    : Math.max(0, skills.length - itemsPerView)

  // Calculate transform for desktop
  const getTransform = () => {
    if (isMobile) {
      return `translateX(-${currentIndex * 100}%)`
    }
    // For desktop, scroll by 3 items at a time
    const scrollAmount = currentIndex * (100 / itemsPerView)
    return `translateX(-${scrollAmount}%)`
  }

  return (
    <div className="skills-carousel-wrapper">
      <h3 className="skills-heading">{categoryHeading}</h3>
      <div className="skills-carousel-container">
        <div
          ref={carouselRef}
          className="skills-carousel"
          style={{ transform: getTransform() }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {skills.map((skill, index) => (
            <div key={index} className="skill-carousel-item">
              <SkillCard
                name={skill.name}
                iconUrl={skill.iconUrl}
                iconAlt={skill.iconAlt}
                className={skill.className}
                description={skill.description}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation dots for mobile */}
      {isMobile && skills.length > 1 && (
        <div className="carousel-dots">
          {skills.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation arrows for desktop */}
      {!isMobile && skills.length > itemsPerView && (
        <>
          <button
            className="carousel-arrow carousel-arrow-prev"
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            aria-label="Previous skills"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="carousel-arrow carousel-arrow-next"
            onClick={() => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))}
            disabled={currentIndex >= maxIndex}
            aria-label="Next skills"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}

