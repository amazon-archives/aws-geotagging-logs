#! /usr/bin/env node
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/


var config=require('../config')
process.env.AWS_PROFILE=config.profile
var aws=require('aws-sdk')
var Promise=require('bluebird')
aws.config.setPromisesDependency(Promise)

module.exports=function(region=config.region){
    aws.config.region=region
    var cf=new aws.CloudFormation()

    var exports={}
    
    return cf.listExports().promise()
    .get('Exports')
    .each(exp=>exports[exp.Name]=exp.Value)
    .return(exports)
}

if(!module.parent){
    module.exports()
    .then(exports=>console.log(JSON.stringify(exports,null,4)))
}
