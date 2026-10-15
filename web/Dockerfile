# Imagen de producción de Firmatech (Next.js standalone + Payload).
# Se construye en la PC (deploy/scripts) y se carga en el VPS: el VPS nunca compila.

FROM node:24-alpine AS base
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH NEXT_TELEMETRY_DISABLED=1
RUN npm install -g pnpm@12.10.1

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_SERVER_URL=https://firmatech.com.ar
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
# Valores solo para compilar: los reales llegan por variables de entorno al ejecutar.
RUN PAYLOAD_SECRET=build-only-secret-not-used-at-runtime-0000 \
    DATABASE_URL=postgres://build:build@127.0.0.1:5432/build \
    pnpm build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0 MEDIA_DIR=/app/media
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs \
    && mkdir -p /app/media && chown nextjs:nodejs /app/media

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/salud >/dev/null || exit 1
CMD ["node", "server.js"]
