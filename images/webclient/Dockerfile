FROM node:10-jessie-slim

# APPLICATION RUNTIME DEPENDENCIES
RUN npm install -g yarn \
    && yarn global add pm2

# CREATE THE UNPRIVILEGED USER TO RUN PROCESSES
RUN useradd -r -u 1001 -d /home/docker docker && usermod -aG sudo docker
# LOG FOLDERS (NOTE THAT CHMOD 777 IS REALLY BAD, A BETTER SOLUTION HAS TO BE IMPLEMENTED)
RUN mkdir /var/log/pm2 && chmod -R 777 /var/log/pm2
# This will be the PM2 working directory
RUN mkdir -p /home/docker/app

# COPY BUILT APPLICATION TO RUN DIRECTORY FOR NON-DEVELOPERS
COPY src/dist/ /home/docker/app/dist/
COPY src/node_modules/ /home/docker/app/node_modules/
COPY src/process-docker.json /home/docker/app/process-docker.json
COPY src/manifest.json /home/docker/app/manifest.json

RUN chown -R docker:docker /home/docker

USER docker
EXPOSE 8080
WORKDIR /home/docker/app
# START APPLICATION
CMD ["pm2-runtime", "start", "process-docker.json"]
##### END APPLICATION #####
