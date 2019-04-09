#! /usr/bin/env node
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var Promise=require('bluebird')
var fs=Promise.promisifyAll(require('fs'))
var path=require('path')


var base_path=path.join('../templates/api/')
var base=require(path.join(base_path,'api.json'))

base.Resources=Object.assign(
    require(path.join(base_path,'config.json')),
    require(path.join(base_path,'root.json')),
    require(path.join(base_path,'qa.json')),
    require(path.join(base_path,'search.json')),
    require(path.join(base_path,'info.json')),
    require(path.join(base_path,'lambda.json')),
    require(path.join(base_path,'client.json')),
    require(path.join(base_path,'health.json')),
    require(path.join(base_path,'policies.json')),
    require(path.join(base_path,'bot.json'))
)
fs.writeFileAsync(__dirname+'/../templates/api.json',JSON.stringify(base,null,2))
.tap(console.log)

