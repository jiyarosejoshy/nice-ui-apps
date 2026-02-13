# -------- Stage 1: Build --------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first (better caching)
COPY package.json package-lock.json ./

RUN npm install

# Copy rest of source code
COPY . .

# Build the app
RUN npm run build


# -------- Stage 2: Serve --------
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

