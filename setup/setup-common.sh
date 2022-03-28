#!/usr/bin/env bash

if [[ $ENVIRONMENT = "production" ]]
then
	export DOMAIN="gousto.co.uk"
else
	export DOMAIN="gousto.info"
fi
export SETUP_FAILURE=false

cd src

# isomorphic: variables
npm config set gousto_webclient_environment_name "${ENVIRONMENT}"
npm config set gousto_webclient_domain "${DOMAIN}"
npm config set gousto_webclient_client_protocol "https"
