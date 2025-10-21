# syntax=docker/dockerfile:1-labs
FROM node:22-alpine
WORKDIR /councilwatch

COPY --parents package.json package-lock.json packages/sever/package.json .
RUN npm install --workspace=packages/server

# Have this later to optimize image caching
COPY . .

# Build the server
RUN npm run build:server

WORKDIR /councilwatch/packages/server

EXPOSE 8080
CMD ["npm", "run", "start:prod"]
