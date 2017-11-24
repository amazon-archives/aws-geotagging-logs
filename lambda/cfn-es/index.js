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
var lib=require('./lib')
var create=require('./lib/create.js')
var aws=require('./lib/util/aws')
var Lambda=new aws.Lambda()

var convert=function(params){
    var rep=function(el){return el.toLowerCase()}
    params.Index=rep(params.Index)
    params.Type=rep(params.Type)
    return params
}

exports.handler=function(event,context,cb){
    var lambda=new lib()
    lambda.LongRunning={
        PingInSeconds: 30,
        MaxPings: 30,
        LambdaApi: Lambda,
        Methods: {
            Create: function(createReponse, params, reply, notDone){
                var con=(require('./lib/con.js'))(process.env.ADDRESS)
                var param=convert(params)

                con.retry(function(){
                    return create(param.Index,param.Type,param.Address)
                    .then(()=>reply(null,param.Index+'-'+param.Type,param))
                })
                .catch(notDone)
            }
        }
    }
    cfnLambda(lambda)(event,context,cb)
}

