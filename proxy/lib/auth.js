/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var http = require('http');
var Promise=require('bluebird')
var aws=require('aws-sdk')
var Cache=require('ttl')
aws.config.setPromisesDependency(Promise);

module.exports = function basicAuth(config) {
    var cache=new Cache({
        ttl:1000*60*5,
        capacity:20
    })

    var cognito=new aws.CognitoIdentityServiceProvider({region:config.region})
    
    function auth(creds){
        if(cache.get(creds.hash)){
            return Promise.resolve()
        }else{
            return cognito.adminInitiateAuth({
                AuthFlow: 'ADMIN_NO_SRP_AUTH', 
                ClientId: config.client,
                UserPoolId: config.userPool,
                AuthParameters: {
                    USERNAME: creds.user,
                    PASSWORD: creds.pass,
                }
            }).promise()
            .tap(()=>cache.put(creds.hash,true))
            .tapCatch(console.log)
        }
    }

    return function(req, res, next) {
        var credentials=parse(req,res,next)
        if(credentials){
            auth(credentials)
            .then(()=>next())
            .catch(()=>unauthorized(res, "kibana"))
        }
    }
};

function parse(req,res,next){
    var authorization = req.headers.authorization;
    if (!authorization) return unauthorized(res, "kibana");

    var parts = authorization.split(' ');
    if (parts.length !== 2) return next(error(400));

    var scheme = parts[0]
      , credentials = new Buffer(parts[1], 'base64').toString()
      , index = credentials.indexOf(':');

    if ('Basic' != scheme || index < 0) return next(error(400));
    
    return {
        user:credentials.slice(0, index),
        pass:credentials.slice(index + 1),
        hash:parts[1]
    }
}

function unauthorized(res, realm) {
  res.statusCode = 401;
  res.setHeader('WWW-Authenticate', 'Basic realm="' + realm + '"');
  res.end('Unauthorized');
};

function error(code, msg){
  var err = new Error(msg || http.STATUS_CODES[code]);
  err.status = code;
  return err;
};
