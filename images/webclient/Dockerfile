FROM node:10-jessie-slim

# AWS CLI to download secrets
RUN apt-get update && apt-get install -y \
    python2.7 \
    python-pip \
    && rm -rf /var/lib/apt/lists/* \
    && pip install awscli --upgrade

# APPLICATION RUNTIME DEPENDENCIES
RUN npm install -g yarn \
    && yarn global add pm2

# CREATE THE UNPRIVILEGED USER TO RUN PROCESSES
RUN useradd -r -d /home/docker docker && usermod -aG sudo docker
# LOG FOLDERS (NOTE THAT CHMOD 777 IS REALLY BAD, A BETTER SOLUTION HAS TO BE IMPLEMENTED)
RUN mkdir /var/log/pm2 && chmod -R 777 /var/log/pm2
# This will be the PM2 working directory
RUN mkdir -p /home/docker/app
RUN chown -R docker:docker /home/docker

# COPY BUILT APPLICATION TO RUN DIRECTORY FOR NON-DEVELOPERS
COPY --chown=docker:docker src/dist/ /home/docker/app/dist/
COPY --chown=docker:docker src/node_modules/ /home/docker/app/node_modules/
COPY --chown=docker:docker src/config/ /home/docker/app/config/
COPY --chown=docker:docker src/public/ /home/docker/app/public/
COPY --chown=docker:docker src/process-docker.json /home/docker/app/process-docker.json
COPY --chown=docker:docker src/manifest.json /home/docker/app/manifest.json
COPY --chown=docker:docker src/ecs_start.sh /home/docker/app/ecs_start.sh

USER docker
EXPOSE 8080
WORKDIR /home/docker/app

# START APPLICATION
ENTRYPOINT ["./ecs_start.sh"]
CMD ["pm2-runtime", "start", "process-docker.json"]
