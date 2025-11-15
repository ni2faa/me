import { IStorageService } from '../storage/StorageService'

/**
 * ThemeService - Single Responsibility: Manages theme operations
 * Dependency Inversion: Depends on IStorageService abstraction
 */
export class ThemeService {
  private readonly STORAGE_KEY = 'palette'
  private readonly DEFAULT_PALETTE = 'eoy-copper'

  constructor(private storage: IStorageService) {}

  getPalette(): string {
    const saved = this.storage.getItem(this.STORAGE_KEY)
    return saved || this.DEFAULT_PALETTE
  }

  setPalette(palette: string): void {
    this.storage.setItem(this.STORAGE_KEY, palette)
    this.applyPalette(palette)
  }

  initialize(): void {
    const palette = this.getPalette()
    this.applyPalette(palette)
    
    // Set default if not exists
    if (!this.storage.getItem(this.STORAGE_KEY)) {
      this.storage.setItem(this.STORAGE_KEY, this.DEFAULT_PALETTE)
    }
  }

  private applyPalette(palette: string): void {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-palette', palette)
  }
}

