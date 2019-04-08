/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var cfnLambda=require('cfn-lambda')
var util=require('./util.js')
var base=require('./base')
var aws=require('./aws')
var athena=new aws.Athena()

module.exports=class query extends base {
    Create(params,reply){
        cfnLambda.SDKAlias({ 
          returnPhysicalId: (data)=>data.NamedQueryId, 
          downcase: false, 
          api: athena, 
          method: "createNamedQuery",
        })(params,reply)
    }
    Delete(ID,params,reply){
        cfnLambda.SDKAlias({ 
          returnPhysicalId: (data)=>params.Name, 
          downcase: false, 
          api: athena, 
          method: "deleteNamedQuery",
        })({NamedQueryId:ID},reply)
    }
}

