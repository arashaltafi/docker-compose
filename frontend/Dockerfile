# frontend/Dockerfile

# 1. Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2. Runtime image
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install production dependencies including 'next'
COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm ci --only=production

# Copy standalone build output
COPY --from=builder /app/.next/standalone ./
# Copy public & static assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["npm", "start"]