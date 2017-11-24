/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
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
