/**
 * IntroSection - Single Responsibility: Renders the introduction section
 * Server Component - No interactivity needed
 */
export function IntroSection() {
  return (
    <section className="section section-intro" id="about">
      <div className="intro-card">
        <div className="intro-main">
          <p className="intro-eyebrow">Full Stack Engineer</p>
          <h1 className="intro-title">Wongsakorn Rodngampring</h1>
          <p className="intro-body">
            I design and build backend APIs, cloud infrastructure, and modern web &amp; mobile apps —
            with a strong focus on Go, Node.js, Next.js, and Flutter running on AWS.
          </p>
          <div className="intro-contact">
            <a className="intro-pill" href="mailto:ni2faa@gmail.com">
              <span className="pill-label">Contact me</span>
              <span className="pill-value">ni2faa@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}


