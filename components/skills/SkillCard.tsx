/**
 * SkillCard - Single Responsibility: Renders a single skill card
 * Interface Segregation: Simple props interface
 * Open/Closed: Can handle both image URLs and text fallbacks without modification
 */
interface SkillCardProps {
  name: string
  iconUrl: string
  iconAlt: string
  className?: string
}

/**
 * Checks if the provided string is a valid URL
 */
function isValidUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://')
}

export function SkillCard({ name, iconUrl, iconAlt, className = '' }: SkillCardProps) {
  const isImageUrl = isValidUrl(iconUrl)

  return (
    <div className={`skill-card ${className}`} aria-label={name}>
      <div className="icon" aria-hidden="true">
        {isImageUrl ? (
          <img src={iconUrl} alt={iconAlt} loading="lazy" decoding="async" />
        ) : (
          <span className="icon-text">{iconUrl}</span>
        )}
      </div>
      <div className="label">{name}</div>
    </div>
  )
}


