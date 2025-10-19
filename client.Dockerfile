# syntax=docker/dockerfile:1-labs
FROM node:22-alpine AS build
WORKDIR /councilwatch

COPY --parents package.json package-lock.json packages/*/package.json . 
RUN npm install

# Have this later to optimize image caching
COPY . .

# Build the client
RUN npm run build:client


# Run the client with nginx
FROM nginxinc/nginx-unprivileged
COPY --from=build /councilwatch/packages/client/dist /usr/share/nginx/html


# nginx unprivileged uses port 8080 by default
EXPOSE 8080

# nginx will automatically run if not overrided here
