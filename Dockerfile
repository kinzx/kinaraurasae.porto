# ==============================================================================
# Stage 1: Dependencies
# ==============================================================================
FROM node:20-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files for dependency installation
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# ==============================================================================
# Stage 2: Builder
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy all dependencies (including dev for build tooling)
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install dev dependencies needed for build (TypeScript, etc.)
RUN npm ci

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application (produces .next/standalone)
RUN npm run build

# ==============================================================================
# Stage 3: Production Runner
# ==============================================================================
FROM node:20-alpine AS runner

WORKDIR /app

# Security: don't run as root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copy standalone output (includes minimal server + traced node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static assets (not included in standalone by design — serve via CDN ideally)
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy public assets (SVG, Lottie JSON, WebP, fonts, etc.)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Switch to non-root user
USER nextjs

# Expose the port
EXPOSE 3000

# Health check — verify the server responds
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the minimal standalone server
CMD ["node", "server.js"]
