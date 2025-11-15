'use client'

import { useEffect } from 'react'
import { ThemeService } from '@/lib/theme/ThemeService'
import { LocalStorageService } from '@/lib/storage/StorageService'

/**
 * ThemeProvider - Single Responsibility: Provides theme context
 * Dependency Inversion: Uses ThemeService abstraction, not direct localStorage
 * Open/Closed: Can be extended with new theme providers without modification
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const storage = new LocalStorageService()
    const themeService = new ThemeService(storage)
    themeService.initialize()
  }, [])

  return <>{children}</>
}
