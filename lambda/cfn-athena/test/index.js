/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var lambda=require('../bin/lambda.js')
var Promise=require('bluebird')
var path=require('path')
var env=require('../bin/env')
var aws=require('aws-sdk')
aws.config.setPromisesDependency(Promise)
aws.config.region=require('../../../config').region

var cf=new aws.CloudFormation()

var exports={}
var bucket=env.then(function(exports){
        return exports["GEOTAG-DEV-BUCKET"]
    })

var run=function(params,test){
    return lambda(params)
        .tap(msg=>console.log("response",JSON.stringify(msg,null,1)))
        .catch(test.ifError)
}

module.exports={
    test:function(test){
        var db_params=Object.assign({},require('./test.json'))
        var table_params=Object.assign({},require('./test.json'))
        table_params.ResourceType="Custom::AthenaTable"
        table_params.RequestType="Create"
        table_params.ResourceProperties={
            Name:"testtable",
            Database:"test",
            Location:"",
            Schema:"text string"
        }
        db_params.ResourceType="Custom::AthenaDatabase"
        db_params.RequestType="Create"
        db_params.ResourceProperties={
            MetaDataBucket:"",
            Name:"test",
            Comment:"test",
            Properties:{
                creator:"john D."
            }
        }
        bucket.then(function(buk){
            db_params.ResourceProperties.MetaDataBucket=buk
            table_params.ResourceProperties.MetaDataBucket=buk
            table_params.ResourceProperties.location=buk+'/test'
            return run(db_params,test)
        })
        .then(function(){
            table_params.RequestType="Create"
            return run(table_params,test)
        })
        .then(function(){
            table_params.RequestType="Delete"
            return run(table_params,test)
        })
        .then(function(){
            db_params.RequestType="Delete"
            return run(db_params,test)
        })
        .finally(test.done)
    },
    query:function(test){
        var params=Object.assign({},require('./test.json'))
        params.ResourceType="Custom::AthenaQuery"
        params.RequestType="Create"
        params.ResourceProperties={
            Database:"tmp",
            Name:"test",
            QueryString:"SHOW TABLES"
        }

        return run(params,test).delay(5000)
        .tap(console.log)
        .then(function(){
            params.RequestType="Delete"
            return run(params,test)
        })
        .finally(test.done)
    }
}


