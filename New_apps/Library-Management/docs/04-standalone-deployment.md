# Standalone Deployment & Docker: Digital E-Library & Reading Hub

## 1. Dockerfile
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8014
CMD ["nginx", "-g", "daemon off;"]
```

## 2. Nginx Subdomain Configuration
```nginx
server {
    listen 80;
    server_name library.vidyafloww.com;

    location / {
        proxy_pass http://127.0.0.1:8014;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8114;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
