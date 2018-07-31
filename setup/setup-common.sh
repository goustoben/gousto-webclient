#!/usr/bin/env bash

# check env and set variables
export NODE_VERSION=8.11.3
export PRODUCTS_VERSION="/products/v2.0"
export DELIVERIES_VERSION="/deliveries/v1.0"

if [[ $ENVIRONMENT = "production" ]]
then
	export PRODUCT_SERVICE_DOMAIN="https://api.gousto.co.uk"
	export DELIVERY_SERVICE_DOMAIN="https://api.gousto.co.uk"
	export DOMAIN="gousto.co.uk"
	export CLIENT_PROTOCOL="https"
else
	export DOMAIN="gousto.info"
	export CLIENT_PROTOCOL="https"
	export PRODUCT_SERVICE_DOMAIN="https://${ENVIRONMENT}-api.gousto.info"
	export DELIVERY_SERVICE_DOMAIN="https://${ENVIRONMENT}-api.gousto.info"
fi
export SETUP_FAILURE=false

# frontend specific requirements
CLOUDFRONT_URL=$(python /root/project/ci_scripts/describe_platform.py --name=content_output_assetsdistributiondomainname --region=eu-west-1)

echo "CLOUDFRONT_URL: $CLOUDFRONT_URL"

cd src
# set yarn environment variables
yarn config set gousto2frontend_environment_name "${ENVIRONMENT}"

yarn config set gousto2frontend_products_domain "${PRODUCT_SERVICE_DOMAIN}"
yarn config set gousto2frontend_products_domain_path "${PRODUCTS_VERSION}"

yarn config set gousto2frontend_deliveries_domain "${DELIVERY_SERVICE_DOMAIN}"
yarn config set gousto2frontend_deliveries_domain_path "${DELIVERIES_VERSION}"

yarn config set gousto2frontend_api_domain "${PRODUCT_SERVICE_DOMAIN}"
yarn config set gousto2frontend_api_token ""
# end set yarn environment variables

cd nodeserver

# isomorphic: variables
yarn config set gousto_frontend_environment_name "${ENVIRONMENT}"
yarn config set gousto_frontend_domain "${DOMAIN}"
yarn config set gousto_frontend_client_protocol "${CLIENT_PROTOCOL}"
yarn config set gousto_frontend_cloudfront_url "${CLOUDFRONT_URL}"

cd ../../

if [[ "$CLOUDFRONT_URL" =~ .*\.(gousto|s3|amazon)\.[a-z\.]*$ ]]
then
  echo $CLOUDFRONT_URL
else
  echo "CLOUDFRONT_URL could not be determined" >&2
  exit 1
fi
