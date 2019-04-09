/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var aws=require('./util/aws')
var Promise=require('./util/promise')
var _=require('lodash')
var zlib=Promise.promisifyAll(require('zlib'))
var metrics=require('./util/metrics')

module.exports=function(records){
    var data=records.map(x=>{return {Data:JSON.stringify(x)+'\n'}})

    return Promise.all(_.chunk(data,400).map(function(chunk,i){
        console.log("sending chunk "+i++ +" of size "+chunk.length) 
        return hoseFactory().putRecordBatch({
            Records:chunk
        }).promise()
    }))
}

function hoseFactory(){
    var name=(process.env.TYPE+"hose").toUpperCase()
    console.log("Sending to hose:"+name)
    return new aws.Firehose({
        params:{DeliveryStreamName:process.env[name]}
    })
}
