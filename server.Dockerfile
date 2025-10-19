# syntax=docker/dockerfile:1
FROM node:22-alpine
WORKDIR /councilwatch

COPY . .
RUN npm install

EXPOSE 8080
CMD ["npm", "run", "start:server"]
