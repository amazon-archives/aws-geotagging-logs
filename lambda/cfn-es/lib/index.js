/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var cfnLambda=require('cfn-lambda')
var create=require('./create.js')
var rm=require('./delete.js')
var equal=require('deep-equal')

module.exports=class clear {
    Create(params,reply){
        reply(null)
    }

    Update(ID,params,oldparams,reply){
        if(equal(params,oldparams)){
            var param=convert(params)
            
            rm(oldparams.Index,oldparams.Type,oldparams.Address)
            .then(()=>create(param.Index,param.Type,params.Address))
            .then(()=>reply(null,params.Index+'-'+params.Type,param))
            .error(err=>reply(err))
            .catch(err=>reply(err))
        }else{
            reply(null,params.Index+'-'+params.Type)
        }
    }
    
    Delete(ID,params,reply){
        rm(params.Index,params.Type,params.Address)
        .then(()=>reply(null,params.Index+'-'+params.Type))
        .error(err=>reply(err))
        .catch(err=>reply(err))
    }
}


