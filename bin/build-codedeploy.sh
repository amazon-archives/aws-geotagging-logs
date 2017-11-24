#! /bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

TMP=$DIR/../build/codedeploy

mkdir -p $TMP
cd $DIR/../proxy && zip -r -q $TMP/proxy.zip .
