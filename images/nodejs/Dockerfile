FROM debian


ARG DEVBOX_ACCESS_TOKEN
ENV DEVBOX_ACCESS_TOKEN=$DEVBOX_ACCESS_TOKEN

WORKDIR /usr/src/webclient
COPY src/package.json /usr/src/webclient/package.json

RUN sed -i 's#ssh://git#https://'"${DEVBOX_ACCESS_TOKEN}"':x-oauth-basic#g' ./package.json

COPY /src/dist /usr/src/webclient/dist

RUN apt-get update
RUN apt-get --yes --force-yes install git openssh-client python make g++ curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y --force-yes nodejs npm

RUN npm install -g yarn --silent

RUN yarn install --pure-lockfile

EXPOSE 8080

CMD ["yarn", "run", "start"]