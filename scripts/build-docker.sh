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
