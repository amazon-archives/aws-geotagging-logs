#! /bin/bash

__dirname="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source $__dirname/var.sh
TEMP=build/templates/$1

aws cloudformation                      \
    --profile $PROFILE                  \
    --region $REGION                    \
    validate-template                   \
    --template-body file://$TEMP.json   \
    | jq
