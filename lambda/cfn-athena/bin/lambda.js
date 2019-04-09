#! /usr/bin/env node
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var argv=require('optimist').argv
var chalk=require('chalk')
var Promise=require('bluebird')
var run=require('../../../bin/run.js')
var env=require('./env')

module.exports=function(event){
    return env.then(function(){
        process.env.AWS_REGION=require('../../../config').region
    })
    .then(()=>run(require('../index.js').handler,event))
}


