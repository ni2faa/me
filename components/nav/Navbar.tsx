'use client'

import { useEffect, useMemo, useState } from 'react'
import { LocalStorageService } from '@/lib/storage/StorageService'
import { LanguageService, SupportedLang } from '@/lib/i18n/LanguageService'

type NavKey = 'about' | 'timeline' | 'skills' | 'contact'

export function Navbar() {
  const storage = useMemo(() => new LocalStorageService(), [])
  const langService = useMemo(() => new LanguageService(storage), [storage])
  const [lang, setLang] = useState<SupportedLang>('en')
  const [open, setOpen] = useState(false)
  const [scrollState, setScrollState] = useState<'is-top' | 'scrolling' | 'pinned'>('is-top')

  useEffect(() => {
    const initial = langService.getLang()
    setLang(initial)
  }, [langService])

  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLElement
      if (!target.closest('.site-header')) setOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

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
    en: { about: 'About', timeline: 'Timeline', skills: 'Skills', contact: 'Contact' },
    th: { about: 'เกี่ยวกับ', timeline: 'ไทม์ไลน์', skills: 'ทักษะ', contact: 'ติดต่อ' },
  }

  const onNav = (id: string) => {
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
        <nav className="nav" aria-label="Primary">
          <button
            className="nav-toggle"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="primary-menu"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
          <ul id="primary-menu" className={`nav-list ${open ? 'open' : ''}`} role="menubar">
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
              <a role="menuitem" tabIndex={0} href="mailto:ni2faa@gmail.com">{labels[lang].contact}</a>
            </li>
          </ul>
        
        </nav>
      </div>
    </header>
  )
}