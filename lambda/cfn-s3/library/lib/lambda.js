/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
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

