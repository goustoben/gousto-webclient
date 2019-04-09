#!/usr/bin/env bash

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
        cp -R ${ORIGIN}${VALUE} ${DEST}${VALUE}
    fi
done

pm2-runtime start ${DEST}/process-docker.json
