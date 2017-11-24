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
