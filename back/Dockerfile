# Stage 1: Base
FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies only when needed
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

# Copy the rest of the source
COPY . .

# Build the NestJS project
RUN npm run build


# Stage 2: Production Runner
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000

# Copy only necessary files from build
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
COPY --from=base /app/package.json ./package.json

# Expose backend port
EXPOSE 4000

# Run compiled NestJS app
CMD ["node", "dist/main.js"]