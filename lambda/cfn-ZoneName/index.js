/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

console.tap=function(tag){return function(x){console.log(tag,x)}}
var Promise=require('bluebird')
var cfnLambda=require('cfn-lambda')
var base=require('./lib')
exports.handler=function(event,context,callback){
    cfnLambda(new base() )(event,context,callback)
}

