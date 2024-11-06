# frontend/Dockerfile
# 1. Build step
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn run build

# 2. Production step
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
