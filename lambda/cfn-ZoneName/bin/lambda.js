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
aws.config.region='us-east-1'
var cf=new aws.CloudFormation()

module.exports=function(event){
    var exports={}
    return cf.listExports().promise()
    .get('Exports')
    .each(exp=>exports[exp.Name]=exp.Value)
    .then(function(){
        process.env.HOSEESFLOWLOGS=exports["VMWARE-DEV-HOSE"]
        process.env.HOSEESCLOUDTRAIL=exports["VMWARE-DEV-HOSE"]
        process.env.HOSES3FLOWLOGS=exports["VMWARE-DEV-HOSE"]
        process.env.HOSES3CLOUDTRAIL=exports["VMWARE-DEV-HOSE"]
    })
    .then(()=>run(require('../index.js').handler,event))
}


