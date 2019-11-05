FROM ubuntu
ENV NSOLID_VERSION 3.x

RUN apt-get update -y
RUN apt-get install -y net-tools git wget xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2
RUN wget http://nsolid-deb.nodesource.com/nsolid_setup_$NSOLID_VERSION \
    && bash nsolid_setup_$NSOLID_VERSION
RUN apt-get install -y nsolid-dubnium nsolid-console

# Copy SSH key for git private repos
# This will be replaced with SSH agent forwarding on prod/later
RUN mkdir -p /root/.ssh/
ARG SSH_PRIVATE_KEY
RUN echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa
RUN chmod 700 /root/.ssh/id_rsa
RUN chown -R $(id -u):$(id -g) ~/.ssh
RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts
RUN echo "StrictHostKeyChecking no" >> /etc/ssh/ssh_config
RUN echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
RUN echo "IdentityFile ~/.ssh/id_rsa" >> /root/.ssh/config

# Install global packages
RUN npm install -g yarn
RUN yarn global add bower
