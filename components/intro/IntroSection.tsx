/**
 * IntroSection - Single Responsibility: Renders the introduction section
 * Server Component - No interactivity needed
 */
import { SocialLinks } from './SocialLinks'

export function IntroSection() {
  return (
    <section className="section section-intro" id="about">
      <div className="intro-card">
        <div className="intro-content">
          <div className="intro-image-wrapper">
            <img
              src="/images/1517007359825.jpeg"
              alt="Wongsakorn Rodngampring"
              className="intro-profile-image"
              width={200}
              height={200}
            />
          </div>
          <div className="intro-main">
            <p className="intro-eyebrow">Full Stack Engineer</p>
            <h1 className="intro-title">Wongsakorn Rodngampring</h1>
            <p className="intro-body">
              I design and build backend APIs, cloud infrastructure, and modern web & mobile apps —
              with a strong focus on Go, Node.js, Next.js, and Flutter running on AWS.
            </p>
            <div className="intro-contact">
              <p className="intro-eyebrow">Contact</p> 
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


