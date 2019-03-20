#!/bin/bash

# upload to production
ASSETS_BUCKET="s3-gousto-${ENVIRONMENT}-assets"
echo "${ASSETS_BUCKET}"

cd src

# Sets env dependant variables
envNameUppercase=$(echo $ENVIRONMENT | tr [a-z] [A-Z])
checkoutComEnvName="CHECKOUTCOM_PK_$envNameUppercase"
export CHECKOUTCOM_PK=${!checkoutComEnvName}

# set yarn environment variables
yarn config set goustowebclient_asset_bucket "${ASSETS_BUCKET}"
yarn config set goustowebclient_environment_name "${ENVIRONMENT}"
yarn config set goustowebclient_products_domain "${PRODUCT_SERVICE_DOMAIN}"
yarn config set goustowebclient_api_domain "${PRODUCT_SERVICE_DOMAIN}"
yarn config set goustowebclient_api_token ""
yarn config set goustowebclient_products_domain_path "/products/v2.0"
yarn config set goustowebclient_deliveries_domain "${DELIVERY_SERVICE_DOMAIN}"
yarn config set goustowebclient_deliveries_domain_path "/deliveries/v1.0"
yarn config set goustowebclient_checkoutcom_pk "${CHECKOUTCOM_PK}"

# end set yarn environment variables

yarn run deploy

yarn run upload -- --upload_dir=${CI_BUILD_NUMBER}
