import { SkillCard } from './SkillCard'
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
        <div key={categoryIndex} className="skills-block">
          <h3 className="skills-heading">{category.heading}</h3>
          <div className="skills-grid">
            {category.skills.map((skill, skillIndex) => (
              <SkillCard
                key={skillIndex}
                name={skill.name}
                iconUrl={skill.iconUrl}
                iconAlt={skill.iconAlt}
                className={skill.className}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
