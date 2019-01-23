###START OF PLATFORM IMAGE###
FROM node:10-jessie-slim

ARG DEVBOX_ACCESS_TOKEN
ENV DEVBOX_ACCESS_TOKEN=$DEVBOX_ACCESS_TOKEN

RUN apt-get update && apt-get --yes --force-yes install git python make g++ \
    && npm install -g yarn --silent \
    && yarn global add pm2

RUN mkdir /.pm2 \ 
    && chmod -R 777 /.pm2 \
    && ls -la /
#Fix to run pm2 as normal user

###END OF PLATFORM IMAGE###

WORKDIR /usr/src/webclient
COPY src/ /usr/src/webclient/
COPY images/nodejs/nodejs-entrypoint.sh /tmp/nodejs-entrypoint.sh

RUN sed -i 's#ssh://git#https://'"${DEVBOX_ACCESS_TOKEN}"':x-oauth-basic#g' ./package.json \
    && sed -i 's#ssh://git#https://'"${DEVBOX_ACCESS_TOKEN}"':x-oauth-basic#g' ./bower.json \
    && yarn global add bower \
    && bower install --force --allow-root \
    && yarn install --pure-lockfile \
    && yarn run build:server:prod

EXPOSE 8080

ENTRYPOINT [ "/tmp/nodejs-entrypoint.sh" ]
# the --no-daemon is a minor workaround to prevent the docker container from thinking pm2 has stopped running and ending itself