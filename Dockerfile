FROM node:alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN npm i turbo -g
COPY . .
RUN turbo prune --scope=development-support-backend --scope=development-support-fronted --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN npm i pnpm -g
RUN corepack enable
RUN pnpm install --frozen-lockfile
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build

FROM base AS runner
WORKDIR /app
COPY --from=installer /app .
WORKDIR /app/apps/backend
RUN npm run prisma:generate
EXPOSE 4000
CMD npm start

# docker build . --tag development-support:0.1
# docker run -p 4000:4000 development-support:0.1