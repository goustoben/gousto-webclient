FROM node:10-jessie-slim

ARG DEVBOX_ACCESS_TOKEN
ENV DEVBOX_ACCESS_TOKEN=$DEVBOX_ACCESS_TOKEN

WORKDIR /usr/src/webclient
COPY src/ /usr/src/webclient/

RUN sed -i 's#ssh://git#https://'"${DEVBOX_ACCESS_TOKEN}"':x-oauth-basic#g' ./package.json \
    && apt-get update && apt-get --yes --force-yes install git python make g++  \
    && npm install -g yarn --silent \
    && yarn global add pm2 \
    && yarn install --pure-lockfile \
    && yarn run build:server:prod

EXPOSE 8080

CMD ["pm2-runtime", "process.json"]