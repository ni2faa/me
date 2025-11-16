import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { LanguageProvider } from '@/components/i18n/LanguageProvider'
import { Navbar } from '@/components/nav/Navbar'
import { IntroSection } from '@/components/intro/IntroSection'
import { CareerTimeline } from '@/components/timeline/CareerTimeline'
import { SkillsSection } from '@/components/skills/SkillsSection'

/**
 * Home Page - Single Responsibility: Composes all sections
 * Dependency Inversion: Depends on abstractions (components) not concrete implementations
 */
export default function Home() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Navbar />
        <main className="container">
          <IntroSection />
          <CareerTimeline />
        </main>
        <SkillsSection />
      </ThemeProvider>
    </LanguageProvider>
  )
}


