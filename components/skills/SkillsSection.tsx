import { SkillsCarousel } from './SkillsCarousel'
import { SkillsDataService } from '@/data/skillsData'

/**
 * SkillsSection - Single Responsibility: Renders the skills section
 * Dependency Inversion: Uses SkillsDataService abstraction
 * Open/Closed: Can be extended with different data sources without modification
 */
export function SkillsSection() {
  const dataService = new SkillsDataService()
  const skillCategories = dataService.getSkillCategories()

  return (
    <section className="container section" id="skills">
      <h2>Skills</h2>
      {skillCategories.map((category, categoryIndex) => (
        <SkillsCarousel
          key={categoryIndex}
          skills={category.skills}
          categoryHeading={category.heading}
        />
      ))}
    </section>
  )
}
