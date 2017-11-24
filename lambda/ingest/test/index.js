/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var lambda=require('../bin/lambda.js')
var env=require('../bin/env.js')
var path=require('path')
var aws=require('aws-sdk')
var Promise=require('bluebird')

aws.config.setPromisesDependency(Promise)
aws.config.region=require('../../../config').region
var s3=new aws.S3()
var zlib=Promise.promisifyAll(require('zlib'))

var run=function(params,test){
    return lambda(params)
        .tap(msg=>console.log("response",JSON.stringify(msg,null,1)))
        .tap(test.ok)
        .catch(test.ifError)
        .finally(test.done)
}

module.exports={
    s3:function(test){
        var params=require('./s3')
        env.then(function(exports){
            
            //params.Records[0].s3.bucket.name=exports["GEOTAG-DEV-BUCKET"]
            //params.Records[0].s3.object.key="test.json"

            return zlib.gzipAsync(Buffer.from([
                JSON.stringify({a:1}),
                JSON.stringify({a:1})
            ].join('\n'),'utf8'))
        })
        .then(function(Body){
            return s3.putObject({
                Bucket:params.Records[0].s3.bucket.name, 
                Key: params.Records[0].s3.object.key,
                Body
            }).promise()
        })
        .then(()=>run(params,test))
    }
}


