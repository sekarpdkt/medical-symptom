#!/bin/bash
ls -tl *.js | awk '{print $9}' | while read -r fn ; do
        echo Starting $fn
        node  $fn &
    done    

    
tail -f run.sh
