# syntax=docker/dockerfile:1
FROM node:22-alpine
WORKDIR /councilwatch

COPY package.json package-lock.json .
RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm", "run", "start:server"]
