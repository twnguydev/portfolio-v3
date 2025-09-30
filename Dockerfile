FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=NODE_ENV
ENV ADMIN_API_KEY=ADMIN_API_KEY
ENV EMAIL_HOST=EMAIL_HOST
ENV EMAIL_PORT=EMAIL_PORT
ENV EMAIL_USER=EMAIL_USER
ENV EMAIL_PASSWORD=EMAIL_PASSWORD
ENV EMAIL_FROM=EMAIL_FROM
ENV EMAIL_TO=EMAIL_TO

ENV WEBHOOK_SECRET=WEBHOOK_SECRET
ENV GITHUB_TOKEN=GITHUB_TOKEN
ENV GITHUB_CRON_SCHEDULE=GITHUB_CRON_SCHEDULE
ENV RUN_GITHUB_JOB_ON_STARTUP=RUN_GITHUB_JOB_ON_STARTUP

ENV NODE_OPTIONS="--experimental-specifier-resolution=node"

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server.js ./server.js

RUN mkdir -p /app/data
RUN chown -R node:node /app

USER node

ENV NODE_OPTIONS="--experimental-specifier-resolution=node"

EXPOSE 3000

CMD ["node", "server.js"]