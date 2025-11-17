/**
 * SkillsData - Single Responsibility: Provides skills data
 * Open/Closed: Can be extended with new skill categories without modifying components
 */
export interface Skill {
  name: string
  iconUrl: string
  iconAlt: string
  className: string
  description: string
}

export interface SkillCategory {
  heading: string
  skills: Skill[]
}

/**
 * SkillsDataService - Single Responsibility: Manages skills data
 * Dependency Inversion: Could be extended to fetch from API
 */
export class SkillsDataService {
  getSkillCategories(): SkillCategory[] {
    return [
      {
        heading: 'Programming Languages & Backend',
        skills: [
          {
            name: 'Golang',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
            iconAlt: 'Golang logo',
            className: 'golang',
            description: 'A statically typed, compiled programming language designed for simplicity and efficiency. Known for excellent concurrency support and fast compilation.',
          },
          {
            name: 'Node.js',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
            iconAlt: 'Node.js logo',
            className: 'node',
            description: 'An open-source, cross-platform JavaScript runtime environment that enables building scalable network applications using JavaScript on the server.',
          },
          {
            name: 'PHP',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
            iconAlt: 'PHP logo',
            className: 'php',
            description: 'A popular server-side scripting language designed for web development. Powers many content management systems and dynamic websites.',
          },
        ],
      },
      {
        heading: 'Frontend & Mobile',
        skills: [
          {
            name: 'React',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            iconAlt: 'React logo',
            className: 'react',
            description: 'A JavaScript library for building user interfaces using reusable components. Enables efficient, declarative UI development with a virtual DOM.',
          },
          {
            name: 'Next.js',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
            iconAlt: 'Next.js logo',
            className: 'next',
            description: 'A React framework for building full-stack web applications. Provides server-side rendering, API routes, and optimized performance out of the box.',
          },
          {
            name: 'Flutter',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
            iconAlt: 'Flutter logo',
            className: 'flutter',
            description: "Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase using Dart.",
          },
        ],
      },
      {
        heading: 'Databases',
        skills: [
          {
            name: 'PostgreSQL',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
            iconAlt: 'PostgreSQL logo',
            className: 'postgres',
            description: 'A powerful, open-source object-relational database system known for reliability, feature robustness, and advanced SQL capabilities.',
          },
          {
            name: 'MySQL',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
            iconAlt: 'MySQL logo',
            className: 'mysql',
            description: 'A widely-used open-source relational database management system. Popular for web applications due to its speed and reliability.',
          },
          {
            name: 'MSSQL',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
            iconAlt: 'Microsoft SQL Server logo',
            className: 'mssql',
            description: 'Microsoft\'s enterprise-grade relational database management system. Offers advanced features for data analytics and business intelligence.',
          },
          {
            name: 'DynamoDB',
            iconUrl: 'DDB',
            iconAlt: 'DynamoDB logo',
            className: 'dynamo',
            description: 'AWS\'s fully managed NoSQL database service. Provides fast, flexible performance with seamless scaling and built-in security.',
          },
          {
            name: 'MongoDB',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
            iconAlt: 'MongoDB logo',
            className: 'mongo',
            description: 'A document-oriented NoSQL database that stores data in flexible, JSON-like documents. Ideal for modern application development.',
          },
        ],
      },
      {
        heading: 'DevOps & Cloud',
        skills: [
          {
            name: 'Docker',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
            iconAlt: 'Docker logo',
            className: 'docker',
            description: 'A platform for developing, shipping, and running applications in containers. Ensures consistent environments across development and production.',
          },
          {
            name: 'Kubernetes',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
            iconAlt: 'Kubernetes logo',
            className: 'kubernetes',
            description: 'An open-source container orchestration platform for automating deployment, scaling, and management of containerized applications.',
          },
          {
            name: 'AWS EC2',
            iconUrl: 'EC2',
            iconAlt: 'AWS EC2 logo',
            className: 'aws',
            description: 'Amazon Elastic Compute Cloud provides scalable virtual servers in the cloud. Enables flexible, on-demand computing capacity.',
          },
          {
            name: 'Ubuntu',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg',
            iconAlt: 'Ubuntu logo',
            className: 'ubuntu',
            description: 'A popular Linux distribution based on Debian. Known for ease of use, regular updates, and strong community support.',
          },
        ],
      },
    ]
  }
}

