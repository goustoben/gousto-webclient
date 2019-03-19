# Environment variables used to retrieve the image from the relevant ECR
# docker build --no-cache -t webclient:1 --build-arg DEVBOX_ACCESS_TOKEN=[githubPersonalToken] AWS_ACCOUNT_NUMBER=[awsAccountNumber] ENVIRONMENT=[awsEnvironment] -f ./images/webclient/Dockerfile .

##### START BUILDER #####
FROM node:10-jessie-slim as builder

ARG DEVBOX_ACCESS_TOKEN
ENV DEVBOX_ACCESS_TOKEN=$DEVBOX_ACCESS_TOKEN

# APT DEPENDENCIES
RUN apt-get update && apt-get install -y \
    git \
    g++ \
    make \
    python \
    sed \
    && rm -rf /var/lib/apt/lists/*

# APPLICATION PACKAGE MANAGERS
RUN npm install -g yarn \
    && yarn global add bower

# CREATE THE UNPRIVILEGED USER TO BUILD THE APPLICATION
RUN useradd -r -u 1001 -d /home/docker docker && usermod -aG sudo docker
RUN mkdir -p /home/docker/artifacts
COPY --chown=docker:docker src /home/docker/artifacts
RUN chown -R docker:docker /home/docker

USER docker
# BUILD APPLICATION
RUN cd /home/docker/artifacts \
    && sed -i 's#ssh://git#https://'"${DEVBOX_ACCESS_TOKEN}"':x-oauth-basic#g' ./package.json \
    && sed -i 's#ssh://git#https://'"${DEVBOX_ACCESS_TOKEN}"':x-oauth-basic#g' ./bower.json \
    && bower install --force \
    && yarn install --pure-lockfile \
    && yarn run build
##### END BUILDER #####



##### START APPLICATION #####
FROM node:10-jessie-slim

# APPLICATION RUNTIME DEPENDENCIES
RUN npm install -g yarn \
    && yarn global add pm2

# CREATE THE UNPRIVILEGED USER TO RUN PROCESSES
RUN useradd -r -u 1001 -d /home/docker docker && usermod -aG sudo docker
# LOG FOLDERS (NOTE THAT CHMOD 777 IS REALLY BAD, A BETTER SOLUTION HAS TO BE INVESTIGATED)
RUN mkdir /var/log/pm2 && chmod -R 777 /var/log/pm2
# This will be the PM2 working directory
RUN mkdir -p /home/docker/app

RUN chown -R docker:docker /home/docker


# COPY BUILT APPLICATION TO RUN DIRECTORY FOR NON-DEVELOPERS
COPY --from=builder  --chown=docker:docker  /home/docker/artifacts/dist /home/docker/app/dist
COPY --from=builder  --chown=docker:docker  /home/docker/artifacts/node_modules /home/docker/app/node_modules
COPY --from=builder  --chown=docker:docker  /home/docker/artifacts/process-docker.json /home/docker/app/process-docker.json

# HERE WE START BUILDING THE APPPLICATION ARTIFACTS USING THE CORRECT USER
USER docker
EXPOSE 8080
WORKDIR /home/docker/app
# START APPLICATION
ENTRYPOINT ["pm2-runtime"]
# HERE WE SPECIFY THE DEFAULT COMMANDS
CMD ["start", "process-docker.json"]
##### END APPLICATION #####
