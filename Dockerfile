FROM node:12.21.0-buster-slim
ARG SSH_PRIVATE_KEY

RUN apt-get update -y &&\
    apt-get install -y net-tools git wget curl xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2

# Copy SSH key for git private repos
# This will be replaced with SSH agent forwarding on prod/later
RUN mkdir -p /root/.ssh/ &&\
    echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa &&\
    chmod 700 /root/.ssh/id_rsa &&\
    chown -R $(id -u):$(id -g) ~/.ssh &&\
    touch /root/.ssh/known_hosts &&\
    ssh-keyscan github.com >> /root/.ssh/known_hosts &&\
    echo "StrictHostKeyChecking no" >> /etc/ssh/ssh_config &&\
    echo "PermitRootLogin yes" >> /etc/ssh/sshd_config &&\
    echo "IdentityFile ~/.ssh/id_rsa" >> /root/.ssh/config

RUN npm i -g bower
