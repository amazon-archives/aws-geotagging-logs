#! /usr/bin/env node
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var argv=require('optimist').argv
var chalk=require('chalk')
var Promise=require('bluebird')
var run=require('../../../bin/run.js')

var fs=Promise.promisifyAll(require('fs'))
var aws=require('aws-sdk')
aws.config.setPromisesDependency(Promise)
aws.config.region=require('../../../config').region
var cf=new aws.CloudFormation()
var exports={}

module.exports=function(event){
    return cf.listExports().promise()
    .get('Exports')
    .each(exp=>exports[exp.Name]=exp.Value)
    .then(function(){
        process.env.AWS_REGION=aws.config.region
        process.env.AWS_LAMBDA_FUNCTION_NAME="test"        
        process.env.LOG_GROUP=exports["VMWARE-DEV-LOG-GROUP"]
        process.env.LOG_STREAM=exports["VMWARE-DEV-LOG-STREAM"]
        process.env.ADDRESS=exports["VMWARE-DEV-ES-ADDRESS"]
    })
    .then(()=>run(require('../index.js').handler,event))
    .return(true)
}


