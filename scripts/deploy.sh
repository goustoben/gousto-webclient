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
npm config set goustowebclient_environment_name "${ENVIRONMENT}"
npm config set goustowebclient_products_domain "${PRODUCT_SERVICE_DOMAIN}"
npm config set goustowebclient_api_domain "${PRODUCT_SERVICE_DOMAIN}"
npm config set goustowebclient_api_token ""
npm config set goustowebclient_products_domain_path "/products/v2.0"
npm config set goustowebclient_deliveries_domain "${DELIVERY_SERVICE_DOMAIN}"
npm config set goustowebclient_deliveries_domain_path "/deliveries/v1.0"
npm config set goustowebclient_checkoutcom_pk "${CHECKOUTCOM_PK}"
# end set npm environment variables

npm run deploy

npm run upload -- --upload_dir=${CI_BUILD_NUMBER}

cp package.json dist/package.json
cp package-lock.json dist/package-lock.json
cp bower.json dist/bower.json

cd dist
mkdir -p ~/.ssh && ssh-keyscan -H github.com >> ~/.ssh/known_hosts # workaround to enable npm install from github
NODE_ENV=production npm ci
NODE_ENV=production npm run postinstall
if [ $? -ne 0 ]
then
  export SETUP_FAILURE=true
  exit 1
fi

cd ..

rm -rf node_modules

cd ..
# build service
# Commenting in favour of running in deploy-containers job
# python ./ci_scripts/deploy_service.py --service webclient
