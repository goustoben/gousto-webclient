#!/bin/bash

org=gousto
token=1e63f20b195c48de9b07c6e2befd80ea957e47b844b842eb97438893c7b04117

if [ "$npm_config_gousto_frontend_new_environmentName" == "production" ]
  then
    project=frontend-new-prod
fi

if [ "$npm_config_gousto_frontend_new_environmentName" == "staging" ]
  then
    project=frontend-new-test
fi

cd public
mapFile=`ls | grep main | grep .js.map`

if [ "$npm_config_gousto_frontend_new_environmentName" = "production" ] || [ "$npm_config_gousto_frontend_new_environmentName" = "staging" ]
  then
    releaseHash=`git rev-parse --short HEAD | tr -d '\n'`
    originalFile=`ls | grep main | grep .js.map | sed s/.map//`

    echo "[sentry] Creating release '$releaseHash'"
    echo

    curl https://sentry.io/api/0/projects/$org/$project/releases/ \
      -X POST \
      -H "Authorization: Bearer $token" \
      -H 'Content-Type: application/json' \
      -d "{\"version\": \"$releaseHash\"}"

    echo
    echo "[sentry] Created release '$releaseHash'"
    echo

    curl https://sentry.io/api/0/projects/$org/$project/releases/$releaseHash \
      -X GET \
      -H "Authorization: Bearer $token" \
      -H 'Content-Type: application/json'

    echo "[sentry] Uploading file '$mapFile' to release '$releaseHash' as '$npm_config_gousto_frontend_clientProtocol://$npm_config_gousto_frontend_cloudfrontUrl/$mapFile'"
    echo

    curl https://sentry.io/api/0/projects/$org/$project/releases/$releaseHash/files/ \
      -X POST \
      -H "Authorization: Bearer $token" \
      -F file=@$mapFile \
      -F name="$npm_config_gousto_frontend_new_clientProtocol://$npm_config_gousto_frontend_new_cloudfrontUrl/$mapFile"

    echo
    echo "[sentry] Uploaded file '$mapFile' to release '$releaseHash'"
    echo

    echo "[sentry] Uploading file '$originalFile' to release '$releaseHash'"
    echo

    curl https://sentry.io/api/0/projects/$org/$project/releases/$releaseHash/files/ \
      -X POST \
      -H "Authorization: Bearer $token" \
      -F file=@$originalFile \
      -F name="$npm_config_gousto_frontend_new_clientProtocol://$npm_config_gousto_frontend_new_cloudfrontUrl/$originalFile"
    echo
    echo "[sentry] Uploaded file '$originalFile' to release '$releaseHash' as '$npm_config_gousto_frontend_new_clientProtocol://$npm_config_gousto_frontend_cloudfrontUrl/$originalFile'"
    echo
  else
    echo "[sentry] Skipping upload of sourcemaps as environment '$npm_config_gousto_frontend_new_environmentName' is not production"
fi

echo
echo "[sentry] Deleting '$mapFile'"
echo
rm $mapFile

echo
echo "[sentry] Deleted '$mapFile'"
echo

echo
echo "[sentry] complete"
echo

cd ..
