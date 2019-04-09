/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

console.tap=function(tag){return function(x){console.log(tag,x)}}
var Promise=require('bluebird')
var cfnLambda=require('cfn-lambda')

var dispatch={
    AthenaDatabase:require('./lib/database'),
    AthenaTable:require('./lib/table'),
    AthenaQuery:require('./lib/query'),
}

exports.handler=function(event,context,callback){
    var type=event.ResourceType.split('::')[1]
    console.log(dispatch[type])
    cfnLambda(new (dispatch[type]))(event,context,callback)
}

