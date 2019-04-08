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
var output=__dirname+'/../build/templates/'+name+'.json'
console.log('building '+name)
var input=require(file+'/index.js')
var template=stringify(input)

cf.validateTemplate({
    TemplateBody:template
}).promise()
.tap(()=>console.log(chalk.green(name+" is valid")))
.catch(error=>console.log(chalk.red(name+" failed:"+error)))
.tap(()=>console.log("writting to "+output+".json"))
.tap(()=>fs.writeFileAsync(output,template))
.tap(()=>console.log('finished building '+name))



