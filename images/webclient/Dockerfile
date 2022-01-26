FROM node:fermium-buster-slim

# AWS CLI to download secrets and libcap for port 80 permission
RUN apt-get update && apt-get install -y \
    python2.7 \
    python-pip \
    libcap2-bin \
    && rm -rf /var/lib/apt/lists/* \
    && pip install awscli --upgrade

# ALLOW KOA TO RUN ON PORT 80
RUN setcap cap_net_bind_service=+ep /usr/local/bin/node

# APPLICATION RUNTIME DEPENDENCIES
RUN npm i -g add pm2

# CREATE THE UNPRIVILEGED USER TO RUN PROCESSES
RUN useradd -r -d /home/docker docker && usermod -aG sudo docker
# LOG FOLDERS (NOTE THAT CHMOD 777 IS REALLY BAD, A BETTER SOLUTION HAS TO BE IMPLEMENTED)
RUN mkdir /var/log/pm2 && chmod -R 777 /var/log/pm2
# This will be the PM2 working directory
RUN mkdir -p /home/docker/app
RUN chown -R docker:docker /home/docker

# COPY BUILT APPLICATION TO RUN DIRECTORY FOR NON-DEVELOPERS
COPY --chown=docker:docker src/apps/webclient/dist/ /home/docker/app/dist/
COPY --chown=docker:docker src/apps/webclient/node_modules/ /home/docker/app/node_modules/
COPY --chown=docker:docker src/apps/webclient/config/ /home/docker/app/config/
COPY --chown=docker:docker src/apps/webclient/public/ /home/docker/app/public/
COPY --chown=docker:docker src/apps/webclient/process-docker.json /home/docker/app/process-docker.json
COPY --chown=docker:docker src/apps/webclient/manifest.json /home/docker/app/manifest.json
COPY --chown=docker:docker src/apps/webclient/ecs_start.sh /home/docker/app/ecs_start.sh

USER docker
EXPOSE 80
WORKDIR /home/docker/app

# START APPLICATION
ENTRYPOINT ["./ecs_start.sh"]
CMD ["pm2-runtime", "start", "process-docker.json"]
