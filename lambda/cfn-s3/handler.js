/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var cfnLambda=require('cfn-lambda')
var util=require('./library')

var dispatch={
    Clear:util.clear,
    Unzip:util.unzip,
    Notification:util.lambda
}

exports.handler=function(event,context,callback){
    var type=event.ResourceType.split('::')[1]
    console.log(dispatch[type])
    cfnLambda(new (dispatch[type]))(event,context,callback)
}
