/**
 * CareerData - Single Responsibility: Provides career timeline data
 * Open/Closed: Can be extended with new data sources without modifying components
 */
export interface CareerItem {
  title: string
  description: string
  detailsId?: string
  detailsContent?: React.ReactNode
}

/**
 * CareerDataService - Single Responsibility: Manages career data
 * Dependency Inversion: Could be extended to fetch from API
 */
export class CareerDataService {
  getCareerItems(): CareerItem[] {
    return [
      {
        title: '2024–Present • Lead Full Stack Developer, Zensorium',
        description: 'Golang, Next.js, AWS optimization.',
        detailsId: 'zensorium-details',
        detailsContent: (
          <>
            <h4>Mobile Development</h4>
            <ul>
              <li>Implemented Flutter framework primarily for POC applications</li>
              <li>Established communication channels between wearable devices and mobile platforms</li>
              <li>Maintained and enhanced native SDKs for iOS and Android to ensure seamless connectivity</li>
            </ul>
            <h4>Backend Development</h4>
            <ul>
              <li>Designed and developed scalable Golang services for real‑time measurement storage</li>
              <li>Implemented multiple operational modes for data collection and processing</li>
              <li>Created a real‑time measurement web platform with a comprehensive design system</li>
            </ul>
            <h4>Technical Leadership</h4>
            <ul>
              <li>Led the full stack development team implementing end‑to‑end solutions</li>
              <li>Ensured system reliability and scalability across platforms</li>
              <li>Maintained high standards for code quality and architecture</li>
            </ul>
            <div className="tech-tags">
              <span className="tag">Flutter</span>
              <span className="tag">iOS SDK</span>
              <span className="tag">Android SDK</span>
              <span className="tag">Golang</span>
              <span className="tag">Real‑time</span>
              <span className="tag">Wearables</span>
              <span className="tag">Web Apps</span>
            </div>
          </>
        ),
      },
      {
        title: '2022–2024 • Senior Software Engineer, Thanachart Securities',
        description: 'Nuxt.js, Golang templates, backend enablement.',
      },
      {
        title: '2020–2022 • Senior Backend Developer, Urbanice',
        description: 'Serverless Node.js, DynamoDB, SAM.',
      },
      {
        title: '2018–2020 • Backend Developer, Konsys',
        description: 'Apollo GraphQL, payment integrations.',
      },
      {
        title: '2015–2018 • Full Stack Developer, Nilecon',
        description: 'PHP, Laravel, Node.js, 2C2P, admin tooling.',
      },
    ]
  }
}

