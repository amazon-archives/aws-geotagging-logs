/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var Promise=require('./lib/promise')
var zlib=Promise.promisifyAll(require('zlib'))
var metrics=require('./lib/metrics')
var aws=require('./lib/aws')
var _=require('lodash')
var s3=new aws.S3()
var hose= new aws.Firehose({
    params:{DeliveryStreamName:process.env.HOSE}
})

exports.handler=function(event,context,cb){
    console.log(event)
    console.log("file:",
        event.Records[0].s3.bucket.name,
        event.Records[0].s3.object.key
    )
    s3.getObject({
        Bucket:event.Records[0].s3.bucket.name,
        Key:event.Records[0].s3.object.key
    }).promise().then(function(result){
        return zlib.gunzipAsync(result.Body)
    })
    .then(function(Data){
        var records=Data.toString().split('\n').map(x=>{return {
            Data:x
        }})
        return Promise.all(_.chunk(records,400).map(function(chunk,i){
            console.log("sending chunk "+i++ +" of size "+chunk.length) 
            return hose.putRecordBatch({
                Records:chunk
            }).promise()
        }))
    })
    .finish(cb,event)
}
