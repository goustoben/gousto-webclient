#!/bin/bash

cd tests/e2e
chmod a+x installDependencies.sh
./installDependencies.sh

cd ../regression
chmod a+x installDependencies.sh
./installDependencies.sh
