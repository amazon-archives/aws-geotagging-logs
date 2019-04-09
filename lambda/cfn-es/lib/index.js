/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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


