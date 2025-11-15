# NI2FAA Profile - Next.js Portfolio

A modern portfolio website built with Next.js 16, featuring an alternating timeline design with the EOY Copper theme.

## Features

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **SOLID Principles** - Well-structured component architecture
- **EOY Copper Theme** - Beautiful copper color palette
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG compliant with proper ARIA attributes
- **Performance Optimized** - Static generation and optimized images

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page composition
│   └── globals.css          # Global styles and theme
├── components/
│   ├── intro/
│   │   └── IntroSection.tsx
│   ├── timeline/
│   │   ├── CareerTimeline.tsx
│   │   ├── TimelineItem.tsx
│   │   └── DetailsToggle.tsx
│   ├── skills/
│   │   ├── SkillsSection.tsx
│   │   └── SkillCard.tsx
│   └── theme/
│       └── ThemeProvider.tsx
└── prototypes/             # Original HTML prototype
```

## SOLID Principles Applied

- **Single Responsibility**: Each component has one clear purpose
- **Open/Closed**: Components can be extended without modification
- **Liskov Substitution**: Components follow consistent interfaces
- **Interface Segregation**: Minimal, focused prop interfaces
- **Dependency Inversion**: Components depend on abstractions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Theme

The project uses the **EOY Copper** theme by default, which provides:
- Warm copper tones
- High contrast for readability
- Modern glassmorphism effects
- Smooth animations

The theme can be changed by modifying the `data-palette` attribute in `app/layout.tsx` or through the `ThemeProvider` component.

## Technologies

- **Next.js 16.0.3** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **CSS Custom Properties** - Theme system

## License

MIT


