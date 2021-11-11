#!/bin/bash

set -o nounset -o errexit -o pipefail

command1=$1
command2=$2

function background {
  local command=$1
  local outputColour=$2
  local outputColourCode

  if tput colors > /dev/null 2>&1;  then
    outputColourCode=$(tput setaf "${outputColour}")
    defaultColourCode=$(tput sgr0)
    /bin/sh -c "$command" > >(sed "s/.*/${outputColourCode}&${defaultColourCode}/") 2>&1 &
  else
    /bin/sh -c "$command" &
  fi
}

yellow=3
background "${command1}" "${yellow}"

magenta=5
background "${command2}" "${magenta}"

wait
