FROM node:18

WORKDIR /app

ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=$GITHUB_TOKEN

COPY package.json ./
RUN yarn install

COPY . .
