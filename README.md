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

## CI/CD and Deployment

This project uses automated CI/CD with GitHub Actions for managing Kubernetes resources.

### Workflow Overview

**Deployment Strategy:**

1. **Secrets/Config** (Local Management)
   - Managed locally via Terraform
   - Use `infra/local/terraform.tfvars` for your k3s configuration
   - Run `terraform apply -var-file=local/terraform.tfvars` manually from your machine
   - Secrets stay on your local machine, never in GitHub

2. **Application Deployment** (Automatic via GitHub Actions)
   - **`deploy.yml`** runs automatically on push to `main`
   - Builds Docker image and pushes to GitHub Container Registry
   - Deploys complete application (deployment, service, ingress)
   - Uses GitHub Secrets for deployment configuration

### Automated Deployment Flow

When you push code to the `main` branch:
1. **Docker Build**: The Next.js application is built into a Docker image
2. **Container Registry**: The image is pushed to GitHub Container Registry (ghcr.io)
3. **Terraform Deployment**: Complete infrastructure is deployed to Kubernetes
4. **Kubernetes Rollout**: The new image is deployed to your cluster

### Setting Up CI/CD

Before the automated deployment can work, you need to configure GitHub Secrets:

1. Go to your repository **Settings** → **Secrets and variables** → **Actions**
2. Add all required secrets as documented in [`.github/SECRETS.md`](.github/SECRETS.md)
3. Key secrets needed:
   - `KUBECONFIG` - Base64-encoded kubeconfig file
   - `TF_VAR_project_name` - Project identifier
   - `TF_VAR_namespace` - Kubernetes namespace
   - `TF_VAR_domain` - Domain for ingress
   - `TF_VAR_replicas_web` - Number of replicas
   - `TF_VAR_resources_web` - Resource limits (JSON)
   - `TF_VAR_secret_data` - Application secrets (JSON)

See [`.github/SECRETS.md`](.github/SECRETS.md) for detailed instructions.

### Manual Deployment

For manual deployment, see the [Terraform Infrastructure Guide](infra/TERRAFORM.md).

### Container Registry

Images are automatically pushed to:
```
ghcr.io/ni2faa/me:latest
ghcr.io/ni2faa/me:<commit-sha>
```

## License

MIT


