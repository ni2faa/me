# Dockerfile for Next.js Application
# Multi-stage build for optimized production image

# Stage 1: Dependencies
FROM node:24-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Stage 2: Builder
FROM node:24-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment to production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
# Note: Next.js standalone output will be in .next/standalone
RUN npm run build

# Stage 3: Runner
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
# Create public directory (Next.js standalone may need it)
RUN mkdir -p /app/public
# Copy public directory if it exists (using shell to handle missing directory)
RUN --mount=from=builder,source=/app,target=/tmp/builder \
    if [ -d /tmp/builder/public ] && [ "$(ls -A /tmp/builder/public 2>/dev/null)" ]; then \
      cp -r /tmp/builder/public/* /app/public/ 2>/dev/null || true; \
    fi
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set ownership
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]

