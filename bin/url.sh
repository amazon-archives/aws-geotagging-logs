#! /bin/bash 

__dirname="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source $__dirname/var.sh
OUTPUT=$($__dirname/exports.js)
BUCKET=$(echo $OUTPUT | jq --raw-output '."GEOTAG-BOOTSTRAP-BUCKET"')
REGION=$(node -e "console.log(JSON.stringify(require('$__dirname/../config')))" | jq --raw-output '."region"')

echo "https://console.aws.amazon.com/cloudformation/home?region=$REGION#/stacks/new?stackName=Kibana-demo&templateURL=https://s3.amazonaws.com/$BUCKET/templates/master.json"


