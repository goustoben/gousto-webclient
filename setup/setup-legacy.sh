#!/bin/bash

cd src

# add gousto-generic and config to yarn packages
cd ./app/assets/js/generic && yarn link && cd ../../../../
cd ./app/assets/js/config && yarn link && cd ../../../../
yarn link
cd ../src

# legacy build
yarn run build
