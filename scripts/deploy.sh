#!/bin/bash

# upload to production
ASSETS_BUCKET="s3-gousto-${ENVIRONMENT}-assets"
echo "${ASSETS_BUCKET}"

cd src

# set npm environment variables
npm config set goustowebclient_asset_bucket "${ASSETS_BUCKET}"
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
python ./ci_scripts/deploy_service.py --service webclient
