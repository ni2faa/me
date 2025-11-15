# Implementation Roadmap

Phase 1 – Select design
- Review prototypes and choose primary layout
- Decide on brand palette, typography, and iconography

Phase 2 – Build Next.js application
- Scaffold pages: home, projects, employment, contact
- Create design‑system tokens and theme provider
- Implement CMS data source (Markdown/JSON or headless CMS)

Phase 3 – Components & content
- Build atomic components: header, sections, cards, timeline, forms
- Migrate content and project entries with images/media
- Add animations guarded by `prefers-reduced-motion`

Phase 4 – Contact delivery
- Implement serverless email endpoint with rate limiting
- Add CAPTCHA or turnstile; keep honeypot fallback

Phase 5 – Quality & performance
- Optimize images with AVIF/WebP and responsive sizes
- Achieve Lighthouse 90+ on mobile and desktop
- Accessibility pass to WCAG 2.1 AA, keyboard testing

Phase 6 – Deployment
- Configure CI/CD, preview environments, and analytics
- Ship to Vercel/Netlify with edge caching