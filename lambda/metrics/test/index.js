/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var lambda=require('../bin/lambda.js')
var path=require('path')

var run=function(params,test){
    return lambda(params)
        .tap(msg=>console.log("response",JSON.stringify(msg,null,1)))
        .tap(test.ok)
        .catch(test.ifError)
        .finally(test.done)
}

module.exports={
    test:function(test){
        run(require('./logs'),test)
    }
}


