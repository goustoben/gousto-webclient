#!/bin/bash

# upload to production
ASSETS_BUCKET="s3-gousto-${ENVIRONMENT}-assets"
echo "${ASSETS_BUCKET}"

cd src

# Sets env dependant variables
envNameUppercase=$(echo $ENVIRONMENT | tr [a-z] [A-Z])
checkoutComEnvName="CHECKOUTCOM_PK_$envNameUppercase"
export CHECKOUTCOM_PK=${!checkoutComEnvName}

# set npm environment variables
npm config set goustowebclient_asset_bucket "${ASSETS_BUCKET}"

npm run deploy

npm run upload -- --upload_dir=${CI_BUILD_NUMBER}
