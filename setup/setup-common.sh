#!/usr/bin/env bash

if [[ $ENVIRONMENT = "production" ]]
then
	export DOMAIN="gousto.co.uk"
	export CLIENT_PROTOCOL="https"
	export CHECKOUTCOM_PK=$CHECKOUTCOM_PK_PRODUCTION
else
	export DOMAIN="gousto.info"
	export CLIENT_PROTOCOL="https"

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
npm config set gousto_webclient_environment_name "${ENVIRONMENT}"
npm config set gousto_webclient_domain "${DOMAIN}"
npm config set gousto_webclient_client_protocol "${CLIENT_PROTOCOL}"
npm config set gousto_webclient_cloudfront_url "${CLOUDFRONT_URL}"

npm config set gousto_webclient_checkoutcom_pk "${CHECKOUTCOM_PK}"
npm config set gousto_webclient_recaptcha_raf_pubk "${RECAPTCHA_RAF_PUBK}"

cd ../

if [[ "$CLOUDFRONT_URL" =~ .*\.(gousto|s3|amazon)\.[a-z\.]*$ ]]
then
  echo $CLOUDFRONT_URL
else
  echo "CLOUDFRONT_URL could not be determined" >&2
  exit 1
fi
