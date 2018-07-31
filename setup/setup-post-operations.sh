#!/usr/bin/env bash
echo "copying files..."
cd src/nodeserver

cp ./public/* ../public/

cd dist
cp -rf `ls -1 | grep -v "js" | grep -v "package.json" | grep -v "node_modules"` ../../public/
cd ../../../
echo "files copied."
ls src/public
