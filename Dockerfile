FROM node:16-alpine

WORKDIR /app

ARG NODE_AUTH_TOKEN
ENV NODE_AUTH_TOKEN=$NODE_AUTH_TOKEN

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

ENTRYPOINT [ "npm", "run"]
