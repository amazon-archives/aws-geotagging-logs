#! /usr/bin/env node
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var Promise=require('bluebird')
var fs=Promise.promisifyAll(require('fs'))
var aws=require('aws-sdk')
var chalk=require('chalk')
aws.config.setPromisesDependency(Promise)
aws.config.region=require('../config').region
var cf=new aws.CloudFormation()
var stringify=require("json-stringify-pretty-compact")


var name=process.argv[2]
var file=__dirname+'/../templates/'+name
var input=require(file)
var template=stringify(input)

cf.validateTemplate({
    TemplateBody:template
}).promise()
.catch(error=>console.log(chalk.red(name+" failed:"+error)))
.then(()=>console.log(template))

