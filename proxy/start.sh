#! /bin/bash

CONFIG="/etc/proxy.json"
LOG="/var/log/server/stdout.log"
LOGERROR="/var/log/server/stderr.log"
LOGFOREVER="/var/log/server/forever.log"

mkdir -p /var/log/server

cd /opt/server
export INSTANCEID=$(ec2-metadata -i | cut -d ":" -f2)
echo "instance id is: $INSTANCEID"

$(npm bin)/../forever/bin/forever start \
    -c "node --max_old_space_size=512"  \
    -l $LOGFOREVER                      \
    -o $LOG                             \
    -e $LOGERROR                        \
    --plain -a                          \
    --uid "server"                      \
    server.js $CONFIG
