#! /bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source $DIR/var.sh
BUCKET=$($DIR/exports.js | jq --raw-output '."GEOTAG-BOOTSTRAP-BUCKET"')
BLUE=$(tput setaf 4)
RESET=$(tput sgr0)

echo bootstrap bucket is $BLUE$BUCKET$RESET
time aws --profile $PROFILE s3 sync $DIR/../build s3://$BUCKET/ --delete 
