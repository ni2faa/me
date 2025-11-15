/**
 * StorageService - Single Responsibility: Abstracts storage operations
 * Dependency Inversion: Provides abstraction for storage, not tied to localStorage
 * Interface Segregation: Focused interface for storage operations
 */
export interface IStorageService {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

/**
 * LocalStorageService - Concrete implementation of storage service
 * Liskov Substitution: Can be replaced with any IStorageService implementation
 */
export class LocalStorageService implements IStorageService {
  getItem(key: string): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(key)
  }

  setItem(key: string, value: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, value)
  }
}

