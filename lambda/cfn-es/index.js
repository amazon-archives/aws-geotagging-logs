/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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

