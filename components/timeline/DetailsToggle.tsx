'use client'

import { useState } from 'react'

/**
 * DetailsToggle - Single Responsibility: Manages expand/collapse state for job details
 * Open/Closed Principle: Can be extended without modifying existing code
 */
interface DetailsToggleProps {
  id: string
  children: React.ReactNode
}

export function DetailsToggle({ id, children }: DetailsToggleProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <>
      <button
        className="toggle"
        type="button"
        aria-expanded={isExpanded}
        aria-controls={id}
        onClick={handleToggle}
      >
        {isExpanded ? 'Hide details' : 'Show details'}
      </button>
      <div
        id={id}
        className={`details ${isExpanded ? 'open' : ''}`}
        tabIndex={-1}
      >
        {children}
      </div>
    </>
  )
}


