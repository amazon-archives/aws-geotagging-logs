/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var cfnLambda=require('cfn-lambda')
var Promise=require('./util/promise')
var aws=require('./util/aws')
var s3=new aws.S3()
var mime = require('mime-types')

var JSZip=require('jszip')
JSZip.external.Promise = Promise;
var jszip=new JSZip()

module.exports=class unzip {
    Create(params,reply){
        s3.getObject({
            Bucket:params.SrcBucket,
            Key:params.SrcKey
        }).promise()
        .tap(console.log)
        .get("Body")
        .then(function(buff){
            return jszip.loadAsync(buff)
            .get('files')
            .then(function(files){
                return Object.keys(files)
                    .map(key=>files[key])
                    .filter(file=>!file.dir)
                    .map(file=>file.name)
            })
        })
        .tap(console.log)
        .map(function(file){
            var type=mime.lookup(file)
            console.log(file+':'+type)
            
            return jszip.file(file).async('nodebuffer')
            .then(function(content){
                var param={
                    Bucket:params.DstBucket,
                    Key:params.DstPrefix+file,
                    Body:content,
                    ContentType:type ? type : null
                }
                console.log(param)
                return s3.putObject(param).promise()
            })
        })
        .map(console.log)
        .then(()=>reply(null,params.SrcBucket+'/'+params.SrcKey) )
        .error(err=>reply(err,params.SrcBucket+'/'+params.SrcKey) )
        .tapCatch(err=>reply(err,params.SrcBucket+'/'+params.SrcKey) )
    }

    Update(ID,params,oldparams,reply){
        reply(null,ID) 
    }
    
    Delete(ID,params,reply){
        reply(null,ID) 
    }
}

