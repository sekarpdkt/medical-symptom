#!/bin/bash
function removeDockerImage()
{
    #If image is already there, remove it
    local id=""
    id=$(docker images | grep "$1" | awk '{print $3}')
    echo $id $name
    if [ -n "$id"  ] 
    then
        echo Removing image $id  $1
        docker rmi $id
    fi
}

function stopDockerContiner()
{
    #If continer is already there, stop it
    /usr/bin/docker ps -a | /bin/grep "$1" | /usr/bin/awk '{print $1}' | while read -r containerID ; do
        local img=`/usr/bin/docker ps -a | /bin/grep "$containerID" | /usr/bin/awk '{print $NF}'`
        echo "Stopping $img of $1"
        /usr/bin/docker stop $containerID

    done
    
}

stopDockerContiner gpslogger/gpslogger:latest
removeDockerImage gpslogger/gpslogger:latest

cd certificates
sudo cp /etc/letsencrypt/live/sekarpdkt.duckdns.org/privkey.pem .
sudo cp /etc/letsencrypt/live/sekarpdkt.duckdns.org/fullchain.pem .
cd ..
#Build the image
docker-compose -f docker-compose.yaml build 

cd certificates
sudo rm privkey.pem
sudo rm fullchain.pem

cd ..

/usr/bin/docker run --rm -v/var/opt/gpsLogger/uploads:/usr/src/app/uploads -v/var/opt/gpsLogger/db:/usr/src/app/db -p8080:8080 -p8088:8088 -e NODE_ENV=prod gpslogger/gpslogger:latest &> /var/tmp/gpslogger-latest.log &


tail -150f /var/tmp/gpslogger-latest.log
