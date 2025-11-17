'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LocalStorageService } from '@/lib/storage/StorageService'
import { LanguageService, SupportedLang } from '@/lib/i18n/LanguageService'

type NavKey = 'about' | 'timeline' | 'skills' | 'showcase' | 'contact'

export function Navbar() {
  const storage = useMemo(() => new LocalStorageService(), [])
  const langService = useMemo(() => new LanguageService(storage), [storage])
  const pathname = usePathname()
  const [lang, setLang] = useState<SupportedLang>('en')
  const [open, setOpen] = useState(false)
  const [scrollState, setScrollState] = useState<'is-top' | 'scrolling' | 'pinned'>('is-top')

  useEffect(() => {
    const initial = langService.getLang()
    setLang(initial)
  }, [langService])

  useEffect(() => {
    // Handle hash navigation when coming from other pages
    if (pathname === '/' && window.location.hash) {
      const hash = window.location.hash.substring(1)
      setTimeout(() => {
        const el = document.getElementById(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [pathname])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    let ticking = false
    const update = () => {
      const y = typeof window !== 'undefined' ? window.scrollY : 0
      const next: 'is-top' | 'scrolling' | 'pinned' = y <= 0 ? 'is-top' : y < 48 ? 'scrolling' : 'pinned'
      setScrollState(next)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const labels: Record<SupportedLang, Record<NavKey, string>> = {
    en: { about: 'About', timeline: 'Timeline', skills: 'Skills', showcase: 'Showcase', contact: 'Contact' },
    th: { about: 'เกี่ยวกับ', timeline: 'ไทม์ไลน์', skills: 'ทักษะ', showcase: 'ผลงาน', contact: 'ติดต่อ' },
  }

  const onNav = (id: string) => {
    // If we're on a different page, navigate to home first
    if (pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpen(false)
    }
  }

  const toggleLang = () => {
    const next = lang === 'en' ? 'th' : 'en'
    setLang(next)
    langService.setLang(next)
  }

  return (
    <header className={`site-header ${scrollState}`} role="banner">
      <div className="header-inner container">
        <div className="brand">
          <span className="brand-text">Wognsakorn RD Profile</span>
        </div>
        <nav className="nav" aria-label="Primary">
          <ul className="nav-list desktop-nav" role="menu">
            <li role="none">
              <a role="menuitem" tabIndex={0} onClick={() => onNav('about')}>{labels[lang].about}</a>
            </li>
            <li role="none">
              <a role="menuitem" tabIndex={0} onClick={() => onNav('timeline')}>{labels[lang].timeline}</a>
            </li>
            <li role="none">
              <a role="menuitem" tabIndex={0} onClick={() => onNav('skills')}>{labels[lang].skills}</a>
            </li>
            <li role="none">
              <Link href="/showcase" role="menuitem" tabIndex={0}>{labels[lang].showcase}</Link>
            </li>
            <li role="none">
              <a role="menuitem" tabIndex={0} href="mailto:ni2faa@gmail.com">{labels[lang].contact}</a>
            </li>
          </ul>
          <button
            className="nav-toggle"
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="primary-menu"
            aria-haspopup="menu"
            onClick={() => setOpen((v) => !v)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setOpen(false)
            }}
          >
            <span className={`hamburger ${open ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </nav>
      </div>
      {/* Full-screen mobile menu overlay */}
      <div className={`mobile-menu-overlay ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="mobile-menu-header">
          <div className="brand">
            <span className="brand-text">Wognsakorn RD Profile</span>
          </div>
          <button
            className="mobile-menu-close"
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <ul id="primary-menu" className={`nav-list ${open ? 'open' : ''}`} role="menu" aria-hidden={!open}>
          <li role="none">
            <a role="menuitem" tabIndex={0} onClick={() => onNav('about')}>{labels[lang].about}</a>
          </li>
          <li role="none">
            <a role="menuitem" tabIndex={0} onClick={() => onNav('timeline')}>{labels[lang].timeline}</a>
          </li>
          <li role="none">
            <a role="menuitem" tabIndex={0} onClick={() => onNav('skills')}>{labels[lang].skills}</a>
          </li>
          <li role="none">
            <Link href="/showcase" role="menuitem" tabIndex={0} onClick={() => setOpen(false)}>{labels[lang].showcase}</Link>
          </li>
          <li role="none">
            <a role="menuitem" tabIndex={0} href="mailto:ni2faa@gmail.com">{labels[lang].contact}</a>
          </li>
        </ul>
      </div>
    </header>
  )
}