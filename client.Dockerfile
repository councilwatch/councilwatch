# syntax=docker/dockerfile:1
FROM node:22-alpine
WORKDIR /councilwatch

COPY package.json package-lock.json .
RUN npm install

COPY . .

EXPOSE 5173
CMD ["npm", "run", "start:client"]
