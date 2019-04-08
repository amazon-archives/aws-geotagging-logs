/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var Promise=require('bluebird')
var aws=require('aws-sdk')
aws.config.setPromisesDependency(Promise)
aws.config.region=process.env.REGION || 'us-east-1'

var cf=new aws.CloudFormation()
var base=require('./test.json')

module.exports=function(){
    return cf.listExports().promise()
    .get("Exports")
    .then(function(exports){
        var out={}
        exports.forEach(el=>out[el.Name]=el.Value)
    })
    .then(()=>base)
}



