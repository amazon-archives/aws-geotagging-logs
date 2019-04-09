/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var _=require('lodash')
var render=require('./render')
module.exports=require('require-dir-all')(__dirname,{
    includeFiles:/^_.*\.(js)$/,
    map:x=>x.name=x.name.slice(1)
})

_.forOwn(module.exports,function(value,key,obj){
    var out=render(value).replace(/\n/g,'').replace(/\s+/g,' ')
    obj[key]=out
})
