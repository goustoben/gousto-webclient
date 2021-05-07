#!/bin/bash

if [ "$1" == "build" ]; then
  ssh-add -K
  printf "\e[1;33;4;44mCleaning repo directory, building images and installing dependencies\e[0m\n"
  rm -rf src/node_modules
  rm -rf src/libs/goustouicomponents
  rm -rf src/dist
  rm -rf src/public
  rm src/manifest.json
  docker build --progress=plain --ssh=default --file="dev-env/Dockerfile" -t webclient .
  exit 0
fi

if [ "$1" == "run" ]; then
    printf "\e[1;33;4;44mRunning Webclient in docker\e[0m\n"
    docker compose -f dev-env/docker-compose.yml up
    exit 0
fi

if [ "$1" == "dev" ]; then
  if [ "$2" == "--docker" ]; then
    printf "\e[1;33;4;44mRunning Webclient in Docker with bind mounts to the host\e[0m\n"
    docker compose -f dev-env/docker-compose.yml -f dev-env/docker-compose.dev.yml up
    exit 0
  elif [ "$2" == "--host" ]; then
    printf "\e[1;33;4;44mRunning Webclient on the host\e[0m\n"
    cd src
    npm run watch & npm run start:dev
    exit 0
  fi
fi

printf "\e[\e[101mCommand not recognised. Allowed commands: build, run, dev --docker and dev --host\e[0m\n"
exit 1
