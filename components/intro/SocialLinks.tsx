"use client"
import { useState } from 'react'

type IconState = {
  linkedinSrc: string
  githubSrc: string
  emailSrc: string
}

export function SocialLinks() {
  const [useBrandColor, setUseBrandColor] = useState<boolean>(true)

  const getIconState = (): IconState => {
    const linkedinSrc = "/icons/icons8-linkedin-48.png"
    const githubSrc = 'https://cdn.simpleicons.org/github/black'
    const emailSrc = "/icons/icons8-email-64.png"
    return { linkedinSrc, githubSrc, emailSrc }
  }

  const { linkedinSrc, githubSrc, emailSrc } = getIconState() 

  const handleToggle = () => {
    setUseBrandColor(prev => !prev)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleToggle()
    }
  }

  const handleLinkedinError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget
    target.src = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg'
  }

  const handleGithubError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget
    target.src = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg'
  }

  return (
    <div className="intro-contact-pills">
      <a className="intro-pill" href="mailto:ni2faa@gmail.com">
        <img
          className="icon-img"
          src={emailSrc}
          alt="Email logo"
          loading="lazy"
        />
        <span className="pill-value">ni2faa@gmail.com</span>
      </a>
      <a
        className="intro-pill"
        href="https://www.linkedin.com/in/wongsakorn-rodngampring-1796a8152"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
      >
        <img
          className="icon-img"
          src={linkedinSrc}
          alt="LinkedIn logo"
          loading="lazy"
          onError={handleLinkedinError}
        />
        <span className="pill-label">LinkedIn</span>
      </a>
      <a
        className="intro-pill"
        href="https://github.com/ni2faa"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Profile"
      >
        <img
          className="icon-img"
          src={githubSrc}
          alt="GitHub logo"
          loading="lazy"
          onError={handleGithubError}
        />
        <span className="pill-label">GitHub</span>
      </a>
    </div>
  )
}