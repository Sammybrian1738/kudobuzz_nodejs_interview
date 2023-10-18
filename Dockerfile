# syntax=docker/dockerfile:1

FROM node:18-alpine

WORKDIR /kudobuzz_nodejs_interview

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]