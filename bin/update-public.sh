#! /bin/bash 
__dirname="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source $__dirname/var.sh
OUTPUT=$($__dirname/exports.js)
DEVBUCKET=$(echo $OUTPUT | jq --raw-output '."QNA-BOOTSTRAP-BUCKET"')

PUBLICBUCKET=$(cat $__dirname/../config.json | jq --raw-output '.publicBucket')

aws --profile $PROFILE s3 cp s3://$DEVBUCKET s3://$PUBLICBUCKET --recursive
echo https://s3.amazonaws.com/$PUBLICBUCKET/templates/master.json
