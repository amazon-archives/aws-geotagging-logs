/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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
