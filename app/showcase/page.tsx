import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { LanguageProvider } from '@/components/i18n/LanguageProvider'
import { Navbar } from '@/components/nav/Navbar'
import { InfrastructureDiagram } from '@/components/showcase/InfrastructureDiagram'

export default function ShowcasePage() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Navbar />
        <main className="container">
          <InfrastructureDiagram />
        </main>
      </ThemeProvider>
    </LanguageProvider>
  )
}

