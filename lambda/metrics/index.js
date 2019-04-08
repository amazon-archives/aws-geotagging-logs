/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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
