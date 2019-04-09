/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var aws=require('./util/aws')
var Promise=require('./util/promise')
var cfnLambda=require('cfn-lambda')
var base=require('./base.js')
var s3=new aws.S3()

module.exports=class extends base{
    constructor(){
        super('BucketNotificationConfiguration')
    }
    
    create_prep(params){
        params
            .NotificationConfiguration
            .LambdaFunctionConfigurations
            .forEach(config=>config.Id=config.Id || this.type+this._makeid())

        return params
    }
    
    Create(in_params,reply){
        var that=this
        
        var params=that.create_prep(in_params)

        Promise.retry(
            ()=>s3.putBucketNotificationConfiguration(params).promise()
        )
        .then(()=>reply(null,this._makeid()))
        .catch(reply)
    }

    Delete(ID,params,reply){
        params
            .NotificationConfiguration
            .LambdaFunctionConfigurations=[]
        this.Create(params,reply) 
    }
}

