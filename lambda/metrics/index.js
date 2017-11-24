/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var Promise=require('bluebird')
var stringify=require("json-stringify-pretty-compact")
var unzip=require('./lib/unzip')
var Process=require('./lib/process')
var send=require('./lib/send')

exports.handler=function(event,context,cb){

    var data=unzip(event)
     
    var name=data.then(x=>x.logGroup.replace('/aws/lambda/',''))

    var process=data.then(x=>x.logEvents)
    .map(x=>Process(x.message))
    .filter(x=>x)
    .tap(console.log)

    Promise.join(process,name)
    .spread(send)
    .then(()=>cb(null))
    .catch(cb)
}
