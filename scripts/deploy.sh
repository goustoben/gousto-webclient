#!/bin/bash

set -e

# upload to production
ASSETS_BUCKET="s3-gousto-${ENVIRONMENT}-assets"
echo "${ASSETS_BUCKET}"

cd src

# set yarn environment variables
yarn config set gousto3frontend_asset_bucket "${ASSETS_BUCKET}"
yarn config set gousto3frontend_environment_name "${ENVIRONMENT}"
yarn config set gousto3frontend_products_domain "${PRODUCT_SERVICE_DOMAIN}"
yarn config set gousto3frontend_api_domain "${PRODUCT_SERVICE_DOMAIN}"
yarn config set gousto3frontend_api_token ""
yarn config set gousto3frontend_products_domain_path "/products/v2.0"
yarn config set gousto3frontend_deliveries_domain "${DELIVERY_SERVICE_DOMAIN}"
yarn config set gousto3frontend_deliveries_domain_path "/deliveries/v1.0"

# end set yarn environment variables

yarn run deploy

yarn run upload -- --upload_dir=${CI_BUILD_NUMBER}

if [ $? -ne 0 ]
then
	cd ../
	exit 1
else

	cp package.json dist/package.json
	rm -rf node_modules

	cd dist

	yarn install --production
	if [ $? -ne 0 ]
	then
	  export SETUP_FAILURE=true
	  exit 1
	fi

	cd ..

	rm -rf node_modules

	cd ..
	# build service
	python ./ci_scripts/deploy_service.py --service frontend
fi
