#!/bin/bash

set -o nounset -o errexit -o pipefail

command1=$1
command2=$2

defaultColourCode=$(tput sgr0)

function background {
  local command=$1
  local outputColour=$2
  local outputColourCode

  outputColourCode=$(tput setaf "${outputColour}")

  $command > >(sed "s/.*/${outputColourCode}&${defaultColourCode}/") 2>&1 &
}

yellow=3
background "${command1}" "${yellow}"

magenta=5
background "${command2}" "${magenta}"

wait
