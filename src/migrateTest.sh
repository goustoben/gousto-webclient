#!/bin/bash

# Colors
Color_Off='\033[0m'       # Text Reset
Red='\033[0;31m'          # Red
Green='\033[0;32m'        # Green
Yellow='\033[0;33m'       # Yellow
Blue='\033[0;34m'         # Blue
Cyan="\033[0;36m"         # Cyan

# Functions
echo_color() {
	echo "$2$1$Color_Off"
}

# Variables
TESTPATH=$1

# Runtime Checks
if [ -z "$TESTPATH" ]; then
    echo_color "Please call '$0 <testname>' to migrate a test!" $Red
    exit 1
fi

if ! [[ "$TESTPATH" =~ ^\.\/test\/.*\/.*\.js$ ]]; then
	echo_color "Please provide a mocha test file" $Red
	exit 1
fi

if ! [ -f $TESTPATH ]; then 
	echo_color "Please provide a path to an existing file: $TESTPATH" $Red
	exit 1
fi

if ! [ -x "$(command -v jest-codemods)" ]; then
  echo_color 'Error: jest-codemods is not installed.' $Red
	echo_color 'Run `npm i -g jest-codemods`' $Blue
  exit 1
fi

if ! [ -x "$(command -v prettier)" ]; then
  echo_color 'Error: prettier is not installed.' $Red
	echo_color 'Run `npm i -g prettierI`' $Blue
  exit 1
fi

# Generate new test filepath
NEW_TESTPATH=${TESTPATH//\.\/test\//"./__tests__/"}
NEW_TESTPATH=${NEW_TESTPATH//\.js/".test.js"}
NEW_TESTDIR=$(dirname $NEW_TESTPATH)

echo_color "This will convert, prettify and move:" $Cyan
echo_color "$TESTPATH" $Yellow
echo_color "To $NEW_TESTPATH" $Yellow

# Prompt
read -p 'Are you sure? [y/n] ' -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]
then
	echo_color "Moving $TESTPATH" $Blue
	mkdir $NEW_TESTDIR
  mv $TESTPATH $NEW_TESTPATH
	echo_color "Done!" $Yellow

	echo_color "Converting $NEW_TESTPATH" $Blue
	jest-codemods --force --parser babel $NEW_TESTPATH
	echo_color "Done!" $Yellow

	echo_color "Prettifying $NEW_TESTPATH" $Blue
	prettier --write --use-tabs --no-semi --single-quote --trailing-comma all $NEW_TESTPATH
	echo_color "Done!" $Yellow
fi

