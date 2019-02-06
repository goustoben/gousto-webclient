# Environment variables used to retrieve the image from the relevant ECR
# docker build --no-cache -t webclient:1 --build-arg DEVBOX_ACCESS_TOKEN=[githubPersonalToken] AWS_ACCOUNT_NUMBER=[awsAccountNumber] ENVIRONMENT=[awsEnvironment] -f ./images/orderskiprecovery/Dockerfile .
ARG AWS_ACCOUNT_NUMBER
ARG ENVIRONMENT

# PULL DEPENDENCIES IN INTERMEDIATE IMAGES
FROM ${AWS_ACCOUNT_NUMBER}.dkr.ecr.eu-west-1.amazonaws.com/${ENVIRONMENT}/platformbase-images/bower10builder as bowerbuilder
FROM ${AWS_ACCOUNT_NUMBER}.dkr.ecr.eu-west-1.amazonaws.com/${ENVIRONMENT}/platformbase-images/yarn10builder as yarnbuilder
FROM ${AWS_ACCOUNT_NUMBER}.dkr.ecr.eu-west-1.amazonaws.com/${ENVIRONMENT}/platformbase-images/node10runtime as runtime

# COPY DEPENDENCIES FROM INTERMEDIATE IMAGES
COPY --from=bowerbuilder /librairies/bower_components /home/docker/librairies/libs
COPY --from=yarnbuilder /librairies/node_modules /home/docker/librairies/node_modules
RUN sudo chown -R docker:docker /home/docker

# BUILD APPLICATION
RUN cp -r /home/docker/librairies/libs /home/docker/app 
RUN cp -r /home/docker/librairies/node_modules /home/docker/app
RUN yarn run build:server:prod

# SAVE BEFORE MOUNT OVERRIDE
RUN cp -r /home/docker/app/dist /home/docker
RUN sudo chown -R docker:docker /home/docker/dist

# START APPLICATION
ENTRYPOINT ["pm2-runtime", "start", "process-docker.json"]
