# ---------- Build stage ----------
FROM node:20-alpine AS build
 
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app
 
# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci
 
# Copy source code
COPY . .
 
# Build the app
RUN npm run build
 
 
# ---------- Production stage ----------
FROM nginx:alpine
 
# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*
 
# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html
 
# Expose port
EXPOSE 80
 
# Start nginx
CMD ["nginx", "-g", "daemon off;"]