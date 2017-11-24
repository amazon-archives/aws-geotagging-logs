#! /usr/bin/env node
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
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


