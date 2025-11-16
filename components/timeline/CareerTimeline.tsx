import { TimelineItem } from './TimelineItem'
import { CareerDataService } from '@/data/careerData'

/**
 * CareerTimeline - Single Responsibility: Renders the career timeline section
 * Dependency Inversion: Uses CareerDataService abstraction
 * Open/Closed: Can be extended with different data sources
 */
export function CareerTimeline() {
  const dataService = new CareerDataService()
  const careerItems = dataService.getCareerItems()

  return (
    <section className="section" id="timeline">
      <h2>Career</h2>
      <div className="altline" id="altline">
        {careerItems.map((item, index) => (
          <TimelineItem
            key={index}
            title={item.title}
            description={item.description}
            detailsId={item.detailsId}
            detailsContent={item.detailsContent}
          />
        ))}
      </div>
    </section>
  )
}
