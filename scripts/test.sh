#!/bin/bash

set -e

chmod a+x tests/legacy-test.sh
chmod a+x tests/isomorphic-mocha.sh
chmod a+x tests/isomorphic-jest.sh

if [[ $CI_MESSAGE != *"--skip-test"* ]]
then
	if [[ $SETUP_FAILURE == "true" ]]
	then
		echo "setup.sh failed. sending exit-code 1"
		exit 1
	else
		yarn global add concurrently@2.2.0
		concurrently --names "isomorphic-mocha,isomorphic-jest" --prefix "{time}-{name}" "./tests/legacy-test.sh" "./tests/isomorphic-mocha.sh" "./tests/isomorphic-jest.sh"
		if [ $? -ne 0 ]
		then
			echo "Unit tests Failed" >&2
			exit 1
		fi
	fi
else
	echo "Skipping Tests"
fi

