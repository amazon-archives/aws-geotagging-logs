/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var cfnLambda=require('cfn-lambda')
module.exports=class clear {
    Create(params,reply){
        reply(null)
    }

    Delete(ID,params,reply){
        reply(null)
    }
    
    
}


