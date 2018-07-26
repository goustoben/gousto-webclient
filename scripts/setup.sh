#!/bin/bash

set -e -x

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn


export NODE_VERSION=8.11.3
export PRODUCTS_VERSION="/products/v2.0"
export DELIVERIES_VERSION="/deliveries/v1.0"

if [[ $CI_BRANCH == "master" ]]
then
	echo "Setting up for production environment"
	export PRODUCT_SERVICE_DOMAIN="https://api.gousto.co.uk"
	export DELIVERY_SERVICE_DOMAIN="https://api.gousto.co.uk"
	export DOMAIN="gousto.co.uk"
	export CLIENT_PROTOCOL="https"
else
	if [[ $CI_BRANCH == "env-"* ]]
	then
		echo "Setting up for env-* environment"
	elif [[ $CI_BRANCH == "develop" ]]
	then
		echo "Setting up for staging environment"
		export ENVIRONMENT="staging"
	else
		echo "Running tests not deploying"
		export ENVIRONMENT="staging"
	fi

	export DOMAIN="gousto.info"
	export CLIENT_PROTOCOL="https"

	export PRODUCT_SERVICE_DOMAIN="https://${ENVIRONMENT}-api.gousto.info"
	export DELIVERY_SERVICE_DOMAIN="https://${ENVIRONMENT}-api.gousto.info"
fi
export SETUP_FAILURE=false

# frontend specific requirements
CLOUDFRONT_URL=$(python ./ci_scripts/describe_platform.py --name=content_output_assetsdistributiondomainname --region=eu-west-1)

echo "CLOUDFRONT_URL: $CLOUDFRONT_URL"

cd src

# isomorphic: variables
yarn config set gousto_frontend_environment_name "${ENVIRONMENT}"
yarn config set gousto_frontend_domain "${DOMAIN}"
yarn config set gousto_frontend_client_protocol "${CLIENT_PROTOCOL}"
yarn config set gousto_frontend_cloudfront_url "${CLOUDFRONT_URL}"

cd ../

if [[ "$CLOUDFRONT_URL" =~ .*\.(gousto|s3|amazon)\.[a-z\.]*$ ]]
then
  echo $CLOUDFRONT_URL
else
  echo "CLOUDFRONT_URL could not be determined" >&2
  exit 1
fi

yarn global add gulp

chmod a+x setup/setup-*.sh

./setup/setup-isomorphic.sh
if [ $? -ne 0 ]
then
  export SETUP_FAILURE=true
fi

#REMOVING TO TEST IF IT IS WORKING WITHOUT THIS STEP
#echo "copying files..."
#cd src

#cd dist
#cp -rf `ls -1 | grep -v "js" | grep -v "package.json" | grep -v "node_modules"` ../public/
#cd ../../
#echo "files copied."

#ls src/public

#if [ $? -ne 0 ]
#then
#  export SETUP_FAILURE=true
#fi
