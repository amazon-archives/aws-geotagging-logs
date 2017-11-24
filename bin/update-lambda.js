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

var config=require('../config')
process.env.AWS_PROFILE=config.profile
        
var Promise=require('bluebird')
var config=require('../config')
var aws=require('aws-sdk')
aws.config.setPromisesDependency(Promise)
aws.config.region=process.env.REGION || config.region
aws.config.signatureVersion='v4'
aws.events.on('retry', function(resp) {
    if (resp.error && resp.error.code === 'Throttling') {
        resp.error.retryable = true;
    }
});

var exports=require('./exports')(config.region)
var lambda=new aws.Lambda()

var functions=new Promise(function(res,rej){
    var funcs=[]
    var incr=0 
    var marker=null

    function next(m,start){
        console.log("request:",++incr)
        if(start){
            var x=lambda.listFunctions().promise()
        }else{
            var x=lambda.listFunctions({
                Marker:marker
            }).promise()
        }
        
        return x.tap(results=>marker=results.NextMarker)
        .get('Functions')
        .map(a=>funcs.push(a.FunctionArn)).tap(()=>console.log(marker))
        .then(function(){
            return marker ? next(marker,false) : res(funcs)
        })
        .catch(rej)
    }
    next(marker,true) 
})

function get(name){
    return functions.filter(function(arn){
        return lambda.listTags({
            Resource:arn
        }).promise().get('Tags')
        .then(function(tags){
            return (tags.name && tags.name===name)        
        })
    })
}

function update(name){
    return get('vmware-'+name)
    .map(function(arn){
        console.log("updating "+name+':'+arn)
        return exports.then(exports=>lambda.updateFunctionCode({
            FunctionName:arn, 
            S3Bucket:exports["GEOTAG-BOOTSTRAP-BUCKET"], 
            S3Key: "lambda/"+name+".zip", 
            Publish:true
        }).promise())
    })
    .then(()=>console.log(name+' updated'))
}
update('ingest')
.then(()=>update('avro'))
//update('cfn-s3')
//update('cfn-athena')
