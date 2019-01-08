#!/usr/bin/env bash

# check env and set variables
export NODE_VERSION=10.15.0
export PRODUCTS_VERSION="/products/v2.0"
export DELIVERIES_VERSION="/deliveries/v1.0"

if [[ $ENVIRONMENT = "production" ]]
then
	export PRODUCT_SERVICE_DOMAIN="https://api.gousto.co.uk"
	export DELIVERY_SERVICE_DOMAIN="https://api.gousto.co.uk"
	export DOMAIN="gousto.co.uk"
	export CLIENT_PROTOCOL="https"
	export CHECKOUTCOM_PK=$CHECKOUTCOM_PK_PRODUCTION
else
	export DOMAIN="gousto.info"
	export CLIENT_PROTOCOL="https"
	export PRODUCT_SERVICE_DOMAIN="https://${ENVIRONMENT}-api.gousto.info"
	export DELIVERY_SERVICE_DOMAIN="https://${ENVIRONMENT}-api.gousto.info"
	envNameUppercase=$(echo $ENVIRONMENT | tr [a-z] [A-Z])
	checkoutComEnvName="CHECKOUTCOM_PK_$envNameUppercase"
	export CHECKOUTCOM_PK=${!checkoutComEnvName}
fi
export SETUP_FAILURE=false

# webclient specific requirements
CLOUDFRONT_URL=$(python /root/project/ci_scripts/describe_platform.py --name=content_output_assetsdistributiondomainname --region=eu-west-1)

echo "CLOUDFRONT_URL: $CLOUDFRONT_URL"

cd src

# isomorphic: variables
yarn config set gousto_webclient_environment_name "${ENVIRONMENT}"
yarn config set gousto_webclient_domain "${DOMAIN}"
yarn config set gousto_webclient_client_protocol "${CLIENT_PROTOCOL}"
yarn config set gousto_webclient_cloudfront_url "${CLOUDFRONT_URL}"

yarn config set gousto_webclient_checkoutcom_pk "${CHECKOUTCOM_PK}"

cd ../

if [[ "$CLOUDFRONT_URL" =~ .*\.(gousto|s3|amazon)\.[a-z\.]*$ ]]
then
  echo $CLOUDFRONT_URL
else
  echo "CLOUDFRONT_URL could not be determined" >&2
  exit 1
fi
