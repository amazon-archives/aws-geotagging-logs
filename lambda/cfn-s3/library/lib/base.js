/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var aws=require('./util/aws')
var cfnLambda=require('cfn-lambda')
var Promise=require('./util/promise')

class base {
    constructor(type){
        this.type=type
        this.create_method='put'+type
        this.delete_method='delete'+type
        this.api=new aws.S3()
    }
    
    _makeid(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    Create(params,reply){
        cfnLambda.SDKAlias({ 
          returnPhysicalId: (data)=>params.Id, 
          downcase: false, 
          api: this.api, 
          method: this.create_method,
          forceBools:[
            "InventoryConfiguration.IsEnabled"
          ]
        })(this.create_prep(params),reply)
    }

    Update(ID,params,oldparams,reply){
        if(params.name === oldparams.name){
            this.Create(params,reply) 
        }else{
            this.Delete(oldparams,function(err){
                if(err){
                    reply(err)
                }else{
                    this.Create(params,reply)
                }
            })
        }
    }
    
    Delete(ID,params,reply){
        params.Id=ID
        cfnLambda.SDKAlias({ 
          returnPhysicalId: (data)=>params.Id, 
          downcase: false, 
          api: this.api,
          method:this.delete_method,
          keys:[
            "Id",
            "Bucket"
          ]
        })(this.create_prep(params),reply)
    }
 }

module.exports=base
