FROM node:fermium-buster-slim

RUN apt-get update -y
RUN apt-get install -y git

COPY . /usr/src/service

WORKDIR /usr/src/service/src

RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts
RUN --mount=type=ssh npm ci
RUN --mount=type=ssh npm run postinstall
RUN npm run build:dev
CMD ["npm", "run", "start:dev"]
