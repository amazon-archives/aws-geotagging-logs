/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var _=require('lodash')
module.exports ={} 

_.forOwn(
    require('require-dir-all')(__dirname),
    value=>_.assign(module.exports,value)
)


