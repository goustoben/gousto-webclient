#!/bin/bash

pm2 startup -u 1001 # I need to run pm2 as the runtime user (root or 1001)
chown -R 1001:1001 /.pm2
chown -R 1001:1001 /var/log/pm2
pm2 start process-docker.json --no-daemon