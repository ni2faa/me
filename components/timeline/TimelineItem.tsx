'use client'

import { useRef } from 'react'
import { useTimelineAnimation } from '@/hooks/useTimelineAnimation'
import { DetailsToggle } from './DetailsToggle'

/**
 * TimelineItemProps - Interface Segregation: Focused interface for timeline item
 */
export interface TimelineItemProps {
  title: string
  description: string
  detailsId?: string
  detailsContent?: React.ReactNode
}

/**
 * TimelineItem - Single Responsibility: Renders a single timeline item
 * Dependency Inversion: Uses useTimelineAnimation hook abstraction
 * Open/Closed: Can be extended with new props without modifying core logic
 */
export function TimelineItem({
  title,
  description,
  detailsId,
  detailsContent,
}: TimelineItemProps) {
  const itemRef = useRef<HTMLElement>(null)
  useTimelineAnimation(itemRef)

  return (
    <article ref={itemRef} className="alt-item" data-animate>
      <h3>{title}</h3>
      <p>{description}</p>
      {detailsId && detailsContent && (
        <DetailsToggle id={detailsId}>{detailsContent}</DetailsToggle>
      )}
    </article>
  )
}
