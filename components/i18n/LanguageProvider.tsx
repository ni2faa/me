'use client'

import { useEffect } from 'react'
import { LocalStorageService } from '@/lib/storage/StorageService'
import { LanguageService } from '@/lib/i18n/LanguageService'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const storage = new LocalStorageService()
    const service = new LanguageService(storage)
    service.initialize()
  }, [])

  return <>{children}</>
}