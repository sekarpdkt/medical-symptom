#!/bin/bash

cd /home/sekar/docker/gpsLogger
docker ps | grep "gpslogger/gpslogger:latest"
id=$(docker ps | grep "gpslogger/gpslogger:latest" | awk '{print $NF}')
if [ -n "$id"  ] 
then
    echo copying static files into $id
    echo docker cp ./static/ $id:/usr/src/app/ 
    docker cp ./static/ $id:/usr/src/app/ 
fi
