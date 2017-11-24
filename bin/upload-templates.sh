#! /bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source $DIR/var.sh
BUCKET=$($DIR/exports.js | jq --raw-output '."GEOTAG-BOOTSTRAP-BUCKET"')

$DIR/build-all.sh
echo bootstrap bucket is $BLUE$BUCKET$RESET

aws --profile $PROFILE s3 sync $DIR/../build/templates s3://$BUCKET/templates
