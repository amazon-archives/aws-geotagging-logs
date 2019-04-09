/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var cfnLambda=require('cfn-lambda')
var Promise=require('./util/promise')
var aws=require('./util/aws')
var s3=new aws.S3()

module.exports=class clear {

    Create(params,reply){
        reply(null,"clear-"+params.Bucket) 
    }

    Update(ID,params,oldparams,reply){
        reply(null,ID) 
    }
    
    Delete(ID,params,reply){
        aws.config.setPromisesDependency(Promise);
        var s3=new aws.S3({region:process.env.AWS_REGION})

        var sources=s3.listObjects({
            Bucket:params.Bucket,
            Prefix:params.prefix
        }).promise()
        .get("Contents")
        .then(function(files){
            return files.map(file=>{return {Key:file.Key}  })
        })
        .tap(console.log)
        .tapCatch(console.log)
        .then(function(keys){
            if(keys.length>0){ 
                return s3.deleteObjects({
                    Bucket:params.Bucket,
                    Delete:{
                        Objects:keys
                    }
                }).promise()
                .tap(console.log)
                .tapCatch(console.log)
                .then(()=>reply(null,ID))
                .error(err=>reply(err,ID))
            }else{
                reply(null,ID) 
            }
        })
    }
}

