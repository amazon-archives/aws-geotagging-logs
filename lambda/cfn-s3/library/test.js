/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

process.env.REGION='us-east-1'
 
var s3=require('./index.js')
var clear_param=require('./params/clear.json')

var unzip_param={
    "SrcBucket":process.env.SRCBUCKET,
    "SrcKey":"website.zip",
    "DstBucket":process.env.DSTBUCKET,
    "DstPrefix":"/"
}

var run=function(name,param){
    return function(test){
        var util=new s3[name]()
        util.Create(param,function(err,id){
            console.log(id)
            util.Delete(id,param,test.done)
        })
    }
}

module.exports={
    clear:function(test){
        var aws=require('aws-sdk')
        aws.config.region=process.env.REGION
        var s3=new aws.S3()
        
        clear_param.Bucket=process.env.DSTBUCKET
        
        s3.putObject({
            Bucket:process.env.DSTBUCKET,
            Key:clear_param.prefix+'/clear',
            Body:"hello"
        }).promise()
        .return(test)
        .then(run("clear",clear_param))
    },
    unzip:function(test){
        var aws=require('aws-sdk')
        aws.config.region=process.env.REGION
        var s3=new aws.S3()
        var JSZip = require("jszip");
        var zip=new JSZip()

       
        run("unzip",unzip_param)(test)
    }

}
