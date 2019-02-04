# Environment variables used to retrieve the image from the relevant ECR
# docker build --no-cache -t webclient:1 --build-arg DEVBOX_ACCESS_TOKEN=[githubPersonalToken] AWS_ACCOUNT_NUMBER=[awsAccountNumber] ENVIRONMENT=[awsEnvironment] -f ./images/orderskiprecovery/Dockerfile .
ARG AWS_ACCOUNT_NUMBER=584614786727
ARG ENVIRONMENT=potatoes

# Dependency builder image - Create intermediate images pulling node and bower dependencies.
#FROM bower10builder:local as bowerbuilder
#FROM yarn10builder:local as yarnbuilder
FROM ${AWS_ACCOUNT_NUMBER}.dkr.ecr.eu-west-1.amazonaws.com/${ENVIRONMENT}/devbox-platform/bower10builder as bowerbuilder
FROM ${AWS_ACCOUNT_NUMBER}.dkr.ecr.eu-west-1.amazonaws.com/${ENVIRONMENT}/devbox-platform/yarn10builder as yarnbuilder

# Base node 10 runtime image using pm2
#FROM node10runtime:local as runtime
FROM ${AWS_ACCOUNT_NUMBER}.dkr.ecr.eu-west-1.amazonaws.com/${ENVIRONMENT}/devbox-platform/node10runtime as runtime

# Copy the dependencies from the builder image
COPY --from=bowerbuilder /transient/bower_components /home/docker/app/libs
COPY --from=yarnbuilder /transient/node_modules /home/docker/app/node_modules

# Build an run the application - Internally reachable via port 8080.
EXPOSE 8080
RUN yarn run build:server:prod
CMD ["pm2", "start", "process-docker.json", "--no-daemon"]
