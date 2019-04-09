/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var lambda=require('../bin/lambda.js')
var Promise=require('bluebird')
var path=require('path')
var aws=require('aws-sdk')

var run=function(params,test){
    return lambda(params)
        .tap(msg=>console.log("response",JSON.stringify(msg,null,1)))
        .catch(test.ifError)
}

module.exports={
    test:function(test){
        var params=Object.assign({},require('./test.json'))
        params.ResourceProperties={
            HostedZoneId:"ZRDPXHU04D1LQ",
        }

        return run(params,test)
        .finally(test.done)
    }
}


