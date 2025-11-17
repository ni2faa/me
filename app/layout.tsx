import type { Metadata, Viewport } from 'next'
import { AnalyticsScripts } from '@/components/analytics/AnalyticsScripts'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ni2faa.github.io/me'
const siteName = 'Wongsakorn Rodngampring - Portfolio'
const title = 'Wongsakorn Rodngampring | Lead Full Stack & Mobile Engineer'
const description = 'Full Stack & Mobile Engineer specializing in Go, Node.js, Next.js, and Flutter. Building scalable backend APIs, cloud infrastructure, and modern web & mobile applications on AWS. Available for freelance and part-time projects.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    'Full Stack Engineer',
    'Mobile Developer',
    'Backend Developer',
    'Golang Developer',
    'Node.js Developer',
    'Next.js Developer',
    'Flutter Developer',
    'AWS Cloud Engineer',
    'Software Engineer',
    'Web Developer',
    'API Developer',
    'Freelancer',
    'Freelance Developer',
    'Freelance Full Stack Developer',
    'Freelance Mobile Developer',
    'Part Time Developer',
    'Part Time Full Stack Developer',
    'Part Time Mobile Developer',
    'Remote Developer',
    'Contract Developer',
    'Wongsakorn Rodngampring',
  ],
  authors: [{ name: 'Wongsakorn Rodngampring' }],
  creator: 'Wongsakorn Rodngampring',
  publisher: 'Wongsakorn Rodngampring',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title,
    description,
    emails: ['ni2faa@gmail.com'],
    images: [
      {
        url: '/images/1517007359825.jpeg',
        width: 1200,
        height: 1200,
        alt: 'Wongsakorn Rodngampring - Full Stack & Mobile Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@ni2faa',
    images: ['/images/1517007359825.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light" data-palette="eoy-copper">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="mask-icon" href="/favicon.svg" color="#D27D55" />
        <AnalyticsScripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Wongsakorn Rodngampring',
              jobTitle: 'Lead Full Stack & Mobile Engineer | Freelance & Part-time Available',
              description: description,
              email: 'ni2faa@gmail.com',
              url: siteUrl,
              image: `${siteUrl}/images/1517007359825.jpeg`,
              sameAs: [
                'https://github.com/ni2faa',
                'https://www.linkedin.com/in/wongsakorn-rodngampring-1796a8152',
              ],
              knowsAbout: [
                'Golang',
                'Node.js',
                'Next.js',
                'Flutter',
                'AWS',
                'Backend Development',
                'Mobile Development',
                'Full Stack Development',
                'API Development',
                'Cloud Infrastructure',
                'Freelance Development',
                'Part-time Development',
                'Remote Development',
              ],
              hasOccupation: [
                {
                  '@type': 'Occupation',
                  name: 'Lead Full Stack & Mobile Engineer',
                },
                {
                  '@type': 'Occupation',
                  name: 'Freelance Full Stack Developer',
                },
                {
                  '@type': 'Occupation',
                  name: 'Part-time Full Stack Developer',
                },
              ],
              alumniOf: {
                '@type': 'Organization',
                name: 'Software Engineering',
              },
            }),
          }}
        />
      </head>
      <body>
        {/* header injected by Navbar component */}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        {/**/}
        <></>
        {children}
      </body>
    </html>
  )
}
