/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var cfnLambda=require('cfn-lambda')
var lib=require('./lib')
var create=require('./lib/create.js')
var aws=require('./lib/util/aws')
var Lambda=new aws.Lambda()

exports.handler=function(event,context,cb){
    var lambda=new lib()
    lambda.LongRunning={
        PingInSeconds: 30,
        MaxPings: 30,
        LambdaApi: Lambda,
        Methods: {
            Create: function(createReponse, params, reply, notDone){
                var con=(require('./lib/con.js'))(process.env.ADDRESS)

                con.retry(function(){
                    return create(params)
                    .then(()=>reply(null))
                })
                .tapCatch(console.log)
                .catch(notDone)
            }
        }
    }
    cfnLambda(lambda)(event,context,cb)
}
