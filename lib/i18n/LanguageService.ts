import { IStorageService } from '../storage/StorageService'

export type SupportedLang = 'en' | 'th'

export class LanguageService {
  private readonly STORAGE_KEY = 'lang'
  private readonly DEFAULT_LANG: SupportedLang = 'en'

  constructor(private storage: IStorageService) {}

  getLang(): SupportedLang {
    const saved = this.storage.getItem(this.STORAGE_KEY)
    if (saved === 'th' || saved === 'en') return saved
    return this.DEFAULT_LANG
  }

  setLang(lang: SupportedLang): void {
    this.storage.setItem(this.STORAGE_KEY, lang)
    this.applyLang(lang)
  }

  initialize(): void {
    const lang = this.getLang()
    this.applyLang(lang)
    if (!this.storage.getItem(this.STORAGE_KEY)) {
      this.storage.setItem(this.STORAGE_KEY, this.DEFAULT_LANG)
    }
  }

  private applyLang(lang: SupportedLang): void {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('lang', lang)
  }
}