FROM node:16-alpine

WORKDIR /ui

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY ./ ./

EXPOSE 3000

CMD [ "npm", "start" ]