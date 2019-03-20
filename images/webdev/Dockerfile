# Environment variables used to retrieve the image from the relevant ECR
# docker build --no-cache -t webclient:1 --build-arg DEVBOX_ACCESS_TOKEN=[githubPersonalToken] AWS_ACCOUNT_NUMBER=[awsAccountNumber] ENVIRONMENT=[awsEnvironment] -f ./images/webclient/Dockerfile .

FROM node:10-jessie-slim

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

# CREATE THE UNPRIVILEGED USER TO RUN PROCESSES
RUN useradd -r -u 1001 -d /home/docker docker && usermod -aG sudo docker

# FOLDERS (NOTE THAT CHMOD 777 IS REALLY BAD, A BETTER SOLUTION HAS TO BE INVESTIGATED)
RUN mkdir /var/log/pm2 && chmod -R 777 /var/log/pm2
# This will be the PM2 working directory
RUN mkdir -p /home/docker/app
# This will be the archived application directory
RUN mkdir -p /home/docker/artifacts
RUN chown -R docker:docker /home/docker

# APPLICATION PACKAGE MANAGERS
RUN npm install -g yarn \
    && yarn global add pm2 \
    && yarn global add bower

# HERE WE START BUILDING THE APPPLICATION ARTIFACTS USING THE CORRECT USER
USER docker

COPY --chown=docker:docker src /home/docker/artifacts

# BUILD APPLICATION ARTIFACTS
RUN cd /home/docker/artifacts \
    ## This syntax will suppress errors and error code as well, because yarnrc is an optional
    ## dependency generated in ci scripts. In this way we allow building the image locally.
#    && cp ./ci_yarnrc ~/.yarnrc 2>/dev/null || : \
    && sed -i 's#ssh://git#https://'"${DEVBOX_ACCESS_TOKEN}"':x-oauth-basic#g' ./package.json \
    && sed -i 's#ssh://git#https://'"${DEVBOX_ACCESS_TOKEN}"':x-oauth-basic#g' ./bower.json \
    && bower install --force \
    && yarn install --pure-lockfile \
    && ENV=local yarn run build:docker:dev

# COPY BUILT APPLICATION TO RUN DIRECTORY FOR NON-DEVELOPERS
RUN cp -r   /home/docker/artifacts/dist \
            /home/docker/artifacts/node_modules \
            /home/docker/artifacts/public \
            /home/docker/artifacts/process-docker.json \
            /home/docker/artifacts/manifest.json \
            /home/docker/app/

EXPOSE 8080
WORKDIR /home/docker/app
# START APPLICATION
ENTRYPOINT ["pm2-runtime"]
# HERE WE SPECIFY THE DEFAULT COMMANDS
CMD ["start", "process-docker.json"]
