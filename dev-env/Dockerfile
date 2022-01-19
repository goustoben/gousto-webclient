FROM node:fermium-buster-slim

RUN apt-get update -y
RUN apt-get install -y git

COPY . /usr/src/service

WORKDIR /usr/src/service/src

RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts
RUN --mount=type=ssh yarn install
RUN yarn build:dev
CMD ["yarn", "start:dev"]
