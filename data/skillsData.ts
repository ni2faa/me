/**
 * SkillsData - Single Responsibility: Provides skills data
 * Open/Closed: Can be extended with new skill categories without modifying components
 */
export interface Skill {
  name: string
  iconUrl: string
  iconAlt: string
  className: string
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
          },
          {
            name: 'Node.js',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
            iconAlt: 'Node.js logo',
            className: 'node',
          },
          {
            name: 'PHP',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
            iconAlt: 'PHP logo',
            className: 'php',
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
          },
          {
            name: 'Next.js',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
            iconAlt: 'Next.js logo',
            className: 'next',
          },
          {
            name: 'Flutter',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
            iconAlt: 'Flutter logo',
            className: 'flutter',
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
          },
          {
            name: 'MySQL',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
            iconAlt: 'MySQL logo',
            className: 'mysql',
          },
          {
            name: 'MSSQL',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
            iconAlt: 'Microsoft SQL Server logo',
            className: 'mssql',
          },
          {
            name: 'DynamoDB',
            iconUrl: 'DDB',
            iconAlt: 'DynamoDB logo',
            className: 'dynamo',
          },
          {
            name: 'MongoDB',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
            iconAlt: 'MongoDB logo',
            className: 'mongo',
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
          },
          {
            name: 'Kubernetes',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
            iconAlt: 'Kubernetes logo',
            className: 'kubernetes',
          },
          {
            name: 'AWS EC2',
            iconUrl: 'EC2',
            iconAlt: 'AWS EC2 logo',
            className: 'aws',
          },
          {
            name: 'Ubuntu',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg',
            iconAlt: 'Ubuntu logo',
            className: 'ubuntu',
          },
        ],
      },
    ]
  }
}

