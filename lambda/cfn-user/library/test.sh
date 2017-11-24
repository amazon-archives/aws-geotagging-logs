#! /bin/bash 

export POOLID=$(../../../bin/exports.js |jq  --raw-output '."VMWARE-COGNITO-POOL-ID"')
export CLIENT=$(../../../bin/exports.js |jq  --raw-output '."VMWARE-COGNITO-CLIENT"')
export USERPOOL=$(../../../bin/exports.js |jq  --raw-output '."VMWARE-COGNITO-USER-POOL"')
export AWS_REGION=$(cat ../../../config.json | jq --raw-output '.region')
echo PoolId:$POOLID
echo client:$CLIENT
echo userpool:$USERPOOL
echo region:$AWS_REGION
$(npm bin)/nodeunit ./test.js 
