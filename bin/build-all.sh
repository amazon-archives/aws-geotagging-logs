#! /bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

$DIR/build.js proxy & 
$DIR/build.js kinesis &  
$DIR/build.js domain &  
$DIR/build.js avro &  
$DIR/build.js data &
$DIR/build.js lambda &
$DIR/build.js athena &

wait 
cp -r $DIR/../templates $DIR/../build
