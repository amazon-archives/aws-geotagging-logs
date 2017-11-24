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
var Promise=require('bluebird')
var path=require('path')
var aws=require('aws-sdk')

var run=function(params,test){
    return lambda(params)
        .tap(msg=>console.log("response",JSON.stringify(msg,null,1)))
        .catch(test.ifError)
}

module.exports={
    test:function(test){
        var params=Object.assign({},require('./test.json'))
        params.ResourceProperties={
            HostedZoneId:"ZRDPXHU04D1LQ",
        }

        return run(params,test)
        .finally(test.done)
    }
}


