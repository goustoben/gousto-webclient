#!/usr/bin/env bash

set -e

### This script will pull the secrets from AWS SSM and register them as environment variables

# Source: https://github.com/jasperes/bash-yaml/blob/master/script/yaml.sh
parse_yaml() {
    local yaml_file=$1
    local prefix=$2
    local s
    local w
    local fs

    s='[[:space:]]*'
    w='[a-zA-Z0-9_.-]*'
    fs="$(echo @|tr @ '\034')"

    (
        sed -e '/- [^\“]'"[^\']"'.*: /s|\([ ]*\)- \([[:space:]]*\)|\1-\'$'\n''  \1\2|g' |

        sed -ne '/^--/s|--||g; s|\"|\\\"|g; s/[[:space:]]*$//g;' \
            -e "/#.*[\"\']/!s| #.*||g; /^#/s|#.*||g;" \
            -e "s|^\($s\)\($w\)$s:$s\"\(.*\)\"$s\$|\1$fs\2$fs\3|p" \
            -e "s|^\($s\)\($w\)${s}[:-]$s\(.*\)$s\$|\1$fs\2$fs\3|p" |

        awk -F"$fs" '{
            indent = length($1)/2;
            if (length($2) == 0) { conj[indent]="+";} else {conj[indent]="";}
            vname[indent] = $2;
            for (i in vname) {if (i > indent) {delete vname[i]}}
                if (length($3) > 0) {
                    vn=""; for (i=0; i<indent; i++) {vn=(vn)(vname[i])("_")}
                    printf("%s%s%s%s=(\"%s\")\n", "'"$prefix"'",vn, $2, conj[indent-1],$3);
                }
            }' |

        sed -e 's/_=/+=/g' |

        awk 'BEGIN {
                FS="=";
                OFS="="
            }
            /(-|\.).*=/ {
                gsub("-|\\.", "_", $1)
            }
            { print }'
    ) < "$yaml_file"
}

register_env_variables() {
    local yaml_file="$1"
    local prefix="$2"
    eval "$(parse_yaml "$yaml_file" "$prefix")"
}

# Sanity check
if [[ -z "${ENVIRONMENT}" ]]; then
    echo "ENVIRONMENT variable must be set"
    exit 1
fi

echo "Got past enviroment check"

if [[ "${ENVIRONMENT}" == "production" ]]; then
    S3_SRC="s3://s3-gousto-platform-prod/${ENVIRONMENT}/config/service/webclient.yml"
else
    S3_SRC="s3://s3-gousto-platform-beta/${ENVIRONMENT}/config/service/webclient.yml"
fi

echo "Going to download: $S3_SRC"

S3_DEST="./secrets.yml"

aws s3 cp ${S3_SRC} ${S3_DEST} --region eu-west-1

echo "Completed download"

register_env_variables ${S3_DEST} ""

echo "About to remove: ${S3_DEST}"
rm ${S3_DEST}

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
