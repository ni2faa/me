import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { IntroSection } from '@/components/intro/IntroSection'
import { CareerTimeline } from '@/components/timeline/CareerTimeline'
import { SkillsSection } from '@/components/skills/SkillsSection'

/**
 * Home Page - Single Responsibility: Composes all sections
 * Dependency Inversion: Depends on abstractions (components) not concrete implementations
 */
export default function Home() {
  return (
    <ThemeProvider>
      <main className="container">
        <IntroSection />
        <CareerTimeline />
      </main>
      <SkillsSection />
    </ThemeProvider>
  )
}


