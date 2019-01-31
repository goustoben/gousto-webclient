# Environment variables used to retrieve the image from the relevant ECR
# docker build --no-cache -t webclient:1 --build-arg DEVBOX_ACCESS_TOKEN=[githubPersonalToken] AWS_ACCOUNT_NUMBER=[awsAccountNumber] ENVIRONMENT=[awsEnvironment] -f ./images/orderskiprecovery/Dockerfile .
ARG AWS_ACCOUNT_NUMBER
ARG ENVIRONMENT

# Dependency builder image - Create intermediate images pulling node and bower dependencies.
FROM ${AWS_ACCOUNT_NUMBER}.dkr.ecr.eu-west-1.amazonaws.com/${ENVIRONMENT}/devbox-platform/bower10builder as bowerbuilder
FROM ${AWS_ACCOUNT_NUMBER}.dkr.ecr.eu-west-1.amazonaws.com/${ENVIRONMENT}/devbox-platform/yarn10builder as yarnbuilder

# Base node 10 runtime image using pm2
FROM node10pm2-runtime as runtime

# Copy the dependencies from the builder image
COPY --from=bowerbuilder /transient/bower_components /app/src/libs
COPY --from=yarnbuilder /transient/node_modules /app/src/node_modules

# Build an run the application - Internally reachable via port 8080.
EXPOSE 8080
RUN yarn run build:server:prod
CMD ["pm2", "start", "process-docker.json", "--no-daemon"]
