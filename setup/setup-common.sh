#!/usr/bin/env bash

if [[ $ENVIRONMENT = "production" ]]
then
	export DOMAIN="gousto.co.uk"
	export CLIENT_PROTOCOL="https"
	export CHECKOUTCOM_PK=$CHECKOUTCOM_PK_PRODUCTION
else
	export DOMAIN=$(aws cloudformation describe-stacks --stack-name "cfn-$ENVIRONMENT-platform-defaults" --query "Stacks[].Outputs[?OutputKey=='Domain'][].OutputValue[]" | \
python3 -c "import sys, json; print(json.load(sys.stdin)[0])")
	export CLIENT_PROTOCOL="https"

	envNameUppercase=$(echo $ENVIRONMENT | tr [a-z] [A-Z])
	checkoutComEnvName="CHECKOUTCOM_PK_$envNameUppercase"
	export CHECKOUTCOM_PK=${!checkoutComEnvName}
fi
export SETUP_FAILURE=false

cd src

# isomorphic: variables
npm config set gousto_webclient_environment_name "${ENVIRONMENT}"
npm config set gousto_webclient_domain "${DOMAIN}"
npm config set gousto_webclient_client_protocol "${CLIENT_PROTOCOL}"
npm config set gousto_webclient_cloudfront_url "${CLOUDFRONT_URL}"


cd ../

if [[ "$CLOUDFRONT_URL" =~ .*\.(gousto|s3|amazon)\.[a-z\.]*$ ]]
then
  echo $CLOUDFRONT_URL
else
  echo "CLOUDFRONT_URL could not be determined" >&2
  exit 1
fi
