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

