#! /bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

BLUE=$(tput setaf 4)
RESET=$(tput sgr0)
TMP=$DIR/../build/lambda

echo function $BLUE$1$RESET

mkdir -p $TMP
cd $DIR/../lambda/$1 && zip -r -q $TMP/$1.zip .
