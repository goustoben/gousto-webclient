#!/bin/bash

pm2 startup -u 1001 # I need to run pm2 as the runtime user (root or 1001)
echo "AFTER STARTUP"
pm2 start process-docker.json --no-daemon