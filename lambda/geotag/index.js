/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var Promise=require('./lib/util/promise')
var parse=require('./lib/parse')
var transform=require('./lib/process')
var hose=require('./lib/hose')
var metrics=require('./lib/util/metrics')

exports.handler=function(event,context,cb){
    process.env.TYPE=null
    Promise.join( 
        parse(event).map(transform).then(hose),
        metrics.recycle()
    )
    .finish(cb,event)
}
