FROM node:alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm i turbo pnpm -g
COPY . .
RUN turbo prune --scope=development-support-backend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN corepack enable
RUN pnpm install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build

FROM base AS runner
WORKDIR /app
RUN npm i pnpm -g
COPY --from=installer /app .
WORKDIR /app/apps/backend
RUN npm run prisma:migrate
WORKDIR /app

EXPOSE 4000
CMD pnpm dev:b
