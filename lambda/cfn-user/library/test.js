/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

process.env.REGION='us-east-1'
var Lib=require('./index.js')
var Promise=require('bluebird')

var lib=Promise.promisifyAll(new Lib())
module.exports={
    create:function(test){
        lib.CreateAsync({
            password:"asfdadfsAS3SD@#",
            username:"admin"
        })
        .then(()=>test.done())
    },
    rm:function(test){
        lib.DeleteAsync("admin",{
            password:"asfdadfsAS3SD@#",
            username:"admin" 
        })
        .then(test.done)
    }
}
