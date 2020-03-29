#!/bin/bash
cd ..
d=`date  +%d-%b-%Y_%H%M`
tar  --exclude="gpsLogger/node_modules"  --exclude="gpsLogger/db"   --exclude="gpsLogger/uploads"  -zcf gpsLogger_nodeJS-$d.tar.gz gpsLogger
