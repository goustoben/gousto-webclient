#!/usr/bin/env bash
### This script will replace the values in env.json based on the available environment variable and then start pm2.
### If a variable is not defined, then it will be reverted to the default value.


# OSX bash version doesn't support associative arrays, so we use a special pattern that will be split later
# PATTERN= variable_name::default_value
ENV_VAR_LIST=(
    'apiToken::inbound_frontend_access_key_goes_here'
    'authClientId::6'
    'authClientSecret::frontend_service_secret'
)

SEDCMD="sed -r -i -e"
if [[ $(uname) == 'Darwin' ]]; then
    SEDCMD="sed -E -i '' -e"
fi

REGEX="[[:print:]]*" ## [:print:] is a POSIX character class: https://en.wikipedia.org/wiki/Regular_expression

# Make substitutions on env.json file
for INDEX in "${ENV_VAR_LIST[@]}" ; do
    VAR="${INDEX%%::*}"
    DEFAULT_VALUE="${INDEX##*::}"
    if [[ -z "${!VAR}" ]]; then
        SEDPATTERN='s/("'${VAR}'": ")('${REGEX}')(")/\1'${DEFAULT_VALUE}'\3/g'
    else
        SEDPATTERN='s/("'${VAR}'": ")('${REGEX}')(")/\1'${!VAR}'\3/g'
    fi

    eval "${SEDCMD} '${SEDPATTERN}' ./config/env.json"
done

pm2-runtime start process-docker.json
