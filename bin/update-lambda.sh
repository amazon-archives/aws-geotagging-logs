#! /bin/bash 
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for LAMBDA in $DIR/../lambda/*;do
    $DIR/lambda.sh $(basename $LAMBDA) &
done

wait

$DIR/update-lambda.js
