#! /usr/bin/env bash

set -o nounset -o errexit -o pipefail

scriptDirectoryPath="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
outputDirectory="${scriptDirectoryPath}/output"

modulePath="${1}"
absoluteModulePath="$( cd "$(dirname "${1}")" ; pwd -P )/$(basename "${modulePath}")"

excludedPathsFilePath="${2}"

optionalArguments="${3:-}"

function join_by { local IFS="$1"; shift; echo "$*"; }

excludePattern="$(join_by '|' $(cat "${excludedPathsFilePath}"))"

outputFilePath="${outputDirectory}/${absoluteModulePath}.html"

mkdir -p "$(dirname "${outputFilePath}")"

echo "Generating graph for ${absoluteModulePath}..."

# TODO: support local file preview (--prefix "${scriptDirectoryPath}")
# TODO: support generating flat graphs (--output-type flat)
# TODO: support generating png (dot -T png -Gdpi=300)
npx depcruise "${absoluteModulePath}" \
  --progress cli-feedback \
  --output-type dot \
  --prefix "https://github.com/Gousto/gousto-webclient/blob/developer-environments-analysis/src/" \
  --webpack-config ../src/webpack.config.dump \
  --exclude "${excludePattern}" ${optionalArguments} | dot -T svg | npx depcruise-wrap-stream-in-html > "${outputFilePath}"

echo "Saved graph to ${outputFilePath}."
