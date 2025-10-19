# syntax=docker/dockerfile:1-labs
FROM node:22-alpine
WORKDIR /councilwatch

COPY --parents package.json package-lock.json packages/*/package.json .
RUN npm install

# Have this later to optimize image caching
COPY . .

EXPOSE 8080
CMD ["npm", "run", "start:server"]
