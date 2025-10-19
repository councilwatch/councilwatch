# syntax=docker/dockerfile:1
FROM node:22-alpine
WORKDIR /councilwatch

COPY . .
RUN npm install

EXPOSE 5173
CMD ["npm", "run", "start:client"]
