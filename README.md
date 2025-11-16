# ni2faa-profile

Personal portfolio application built with Next.js 16, React 19, and TypeScript. It showcases an introduction, career timeline, and skills, with a small, maintainable architecture and production-ready delivery via Docker, Kubernetes, and GitHub Actions.

## Features
- Next.js App Router with `app/` directory
- Theming via `ThemeService` with persisted palette
- Structured data services for skills and career timeline
- Optimized Docker multi-stage build with standalone output
- Kubernetes manifests for Deployment, Service, and Ingress (Traefik + cert-manager)
- GitHub Actions for image build/push and manifest bumping

## Quick Start
- Prerequisites: Node `>=18.17` (Node 20+ recommended), npm
- Install dependencies: `npm ci`
- Start dev server: `npm run dev` then open `http://localhost:3000`

## Scripts
- `npm run dev` – start development server
- `npm run build` – build production bundle
- `npm run start` – run production server
- `npm run lint` – run Next.js ESLint

## Project Structure
- `app/` – App Router pages, layout, global styles
- `components/` – Intro, Skills, Timeline, Theme provider
- `lib/` – Theme and Storage services
- `data/` – Data services providing skills and career items
- `infra/` – Kubernetes manifests and Argo CD application
- `.github/` – CI workflows and helper scripts

## Configuration
- `next.config.js` sets `output: 'standalone'` and allows remote images from `cdn.jsdelivr.net` and `cdn.simpleicons.org`
- Environment variables: see `.env.example` (used by helper scripts); the app does not require runtime secrets

## Docker
Build and run the production image locally:

```bash
docker build -t ni2faa/me:local .
docker run --rm -p 3000:3000 ni2faa/me:local
# open http://localhost:3000
```

The image uses Next.js standalone output and runs as a non-root user on port `3000`.

## Kubernetes
Manifests are in `infra/manifests`:
- `deployment.yml` – uses image `${REGISTRY_HOST_IP}:5000/ni2faa/me:<tag>` and exposes container port `3000`
- `service.yml` – `ClusterIP` service on port `80` targeting `3000`
- `ingress.yml` – Traefik ingress with TLS via cert-manager for host `ni2faa.ddns.net`

Apply to a cluster:

```bash
kubectl apply -f infra/manifests/
```

Ensure your private registry is reachable and your cluster has Traefik and cert-manager configured.

## CI/CD
Workflow: `.github/workflows/deploy.yml`
- Triggers on pushes to `main` and `feat/infra`
- Builds the Docker image on a self-hosted runner
- Pushes to `${REGISTRY_HOST_IP}:5000`
- Updates `infra/manifests/deployment.yml` with the new tag and commits the change back

Required secret:
- `REGISTRY_HOST_IP` – e.g., `192.168.1.48`

## Argo CD (optional)
The Argo CD Application (`infra/argocd/application.yml`) points to this repo and syncs the manifests:
- `repoURL: https://github.com/ni2faa/me.git`
- `targetRevision: feat/infra`
- `path: infra/manifests`

Update `targetRevision` to `main` if you want Argo CD to track the default branch.

## Documentation
- `docs/designs.md` – portfolio design options
- `docs/roadmap.md` – implementation roadmap
- `docs/testing-reports.md` – responsive and accessibility testing notes

## License
Proprietary. Contact `ni2faa@gmail.com` for usage permissions.