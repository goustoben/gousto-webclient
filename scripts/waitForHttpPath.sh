#!/usr/bin/env bash

set -o errexit -o nounset -o pipefail

httpPort=$1
httpPath=$2
timeoutSeconds=$3

url="http://localhost:${httpPort}${httpPath}"

printf "\nWaiting for %s to be available...\n\n" "${url}"

start=$(date +"%s")

while ! curl --silent --fail "${url}" > /dev/null; do
  if [ $(($(date +"%s")-"${start}")) -gt $timeoutSeconds ]; then
    echo "Timed out after ${timeoutSeconds}s waiting for successful response from ${url}."
    exit 1
  fi

  sleep 0.1
done

printf "\n%s is ready.\n\n" "${url}"
