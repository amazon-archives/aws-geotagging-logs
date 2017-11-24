/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var lambda=require('../bin/lambda.js')
var path=require('path')

var run=function(params,test){
    return lambda(params)
        .tap(msg=>console.log("response",JSON.stringify(msg,null,1)))
        .tap(test.ok)
        .catch(test.ifError)
        .finally(test.done)
}
var params=require('./test')
module.exports={
    create:function(test){
        params.RequestType="Create"
        params.ResourceProperties={
            ExportFile:{
                Bucket:"access-logs-examples",
                Key:"export.json"
            }
        }
        run(params,test)
    }
}


