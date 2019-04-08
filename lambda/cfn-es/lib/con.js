#! /usr/bin/env node
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var Promise=require('./util/promise')
var elasticsearch=require('elasticsearch')
var aws = require('./util/aws');

module.exports=function(address){
    return Promise.promisify(aws.config.getCredentials).bind(aws.config)()
    .then(function(){
        return new Promise(function(res,rej){
            var next=function(count){
                var client=require('elasticsearch').Client({
                    hosts: address,
                    pingTimeout:60*1000,
                    requestTimeout:60*1000,
                    connectionClass: require('http-aws-es'),
                    defer: function () {
                        return Promise.defer();
                    },
                    amazonES: {
                        region: process.env.AWS_REGION,
                        credentials: aws.config.credentials
                    }
                })
                
                Promise.resolve(client)
                .tap(es=>es.ping())
                .tap(res)
                .catch(function(err){
                    console.log("Connection Error:"+err)
                    return count >0 ? setTimeout(()=>next(--count),1000) : rej("Failed to connect")
                })
            }
            next(10)
        })
    })
}

