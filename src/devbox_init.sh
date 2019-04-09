#!/usr/bin/env bash

## THIS FILE IS NEEDED FOR DEVBOX INIT CONTAINER

ORIGIN="/home/docker/artifacts"
DEST="/home/docker/app"

PATHS=(
    '/dist'
    '/node_modules'
    '/public'
    '/process-docker.json'
    '/manifest.json'
)

for VALUE in "${PATHS[@]}" ; do
    if [[ ! -e "${DEST}${VALUE}" ]]; then
        cp -r ${ORIGIN}${VALUE} ${DEST}${VALUE}
    fi
done
