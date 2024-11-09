# Base

FROM node:20.17.0-alpine AS base

RUN apk add --no-cache docker-cli

WORKDIR /codium-backend

ARG JWT_SECRET
ARG DATABASE_URL

ENV JWT_SECRET=${JWT_SECRET}
ENV DATABASE_URL=${DATABASE_URL}

RUN corepack enable
RUN corepack prepare pnpm@9.12.1 --activate

COPY package.json pnpm-lock.yaml /codium-backend/

RUN pnpm install --frozen-lockfile

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

# Development

FROM base AS dev 

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

# Production

FROM base AS production

WORKDIR /codium-backend

RUN pnpm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]