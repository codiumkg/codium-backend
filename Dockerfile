# Base

FROM node:20.17.0-alpine AS base

WORKDIR /codium-backend

COPY package*.json /

RUN npm install

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

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]