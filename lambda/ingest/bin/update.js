#! /usr/bin/env node
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var argv=require('optimist').argv
var chalk=require('chalk')
var Promise=require('bluebird')

var fs=Promise.promisifyAll(require('fs'))
var config=require('../../template/config')
config.base_dir='../../template'
console.log(config)

var Lambda=require('lambda')
var cf=new (require('cloudformation'))(config)
var aws=require('aws')
var aws_lambda=new aws.Lambda({region:config.region})

var lambda_config=require('../config')
lambda_config.base_dir='..'
var lambda=new Lambda(lambda_config)

Promise.join(
    cf.getOutput(),
    (require('cloudformation')).getExport('AssetBucket',config.region),
    (require('cloudformation')).getExport('LambdaLibrary',config.region)
    ,lambda.upload()
)
.spread(function(output,bucket,library){
    var base=require('../../config')
    console.log(library+'/'+base.ProjectName+'-handler.zip')
    var params_base = {
        Publish: true, 
        S3Bucket:bucket,
        S3Key:library+'/'+base.ProjectName+'-handler.zip'
    };
   
    var handler_param=Object.assign({
            FunctionName:output.HandlerArn
        },
        params_base
    )
    var fulfilment_param=Object.assign({
            FunctionName:output.FulfilmentArn
        },
        params_base
    )

    return Promise.join(
        aws_lambda.updateFunctionCode(handler_param).promise(),
        aws_lambda.updateFunctionCode(fulfilment_param).promise()
    )
})

