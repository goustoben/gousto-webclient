#! /usr/bin/env bash

set -o nounset -o errexit -o pipefail

rm -rf output

grep --include \*.js --include \*.ts -lRE '<Route($|[^r])' ../src/src | xargs -n 1 -I {} ./graph.sh {} api_analysis_excluded_paths "--do-not-follow route(s)?.js|^../src/src/layouts/"

# shellcheck disable=SC2038
find ../src/src/layouts -name index.js | xargs -n 1 -I {} ./graph.sh {} api_analysis_excluded_paths

./graph.sh ../src/src/containers/PageContainer.js api_analysis_excluded_paths
