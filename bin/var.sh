#! /bin/bash 

export __dirname="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export OUTPUT=$($__dirname/exports.js)
export BUCKET=$(echo $OUTPUT | jq --raw-output '."GEOTAG-BOOTSTRAP-BUCKET"')
export REGION=$(node -e "console.log(JSON.stringify(require('$__dirname/../config')))" | jq --raw-output '."region"')
export PROFILE=$(node -e "console.log(JSON.stringify(require('$__dirname/../config')))" | jq --raw-output '."profile"')
export AWS_PORFILE=$PROFILE


