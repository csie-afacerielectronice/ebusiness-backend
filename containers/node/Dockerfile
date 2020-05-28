FROM node:13-alpine

WORKDIR /var/www/html

COPY package*.json ./

RUN npm install

COPY . .
