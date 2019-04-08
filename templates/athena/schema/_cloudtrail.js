/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var _=require('lodash')

var sessionIssuer={
    "type":"object",
    "properties":_.merge({},stringify([
        "type",
        "principalId",
        "arn",
        "accountId",
        "userName",
    ]))
}

var attributes={
    "type":"object",
    "properties":_.merge({},stringify([
        "mfaAuthenticated",
        "creationDate",
     ]))
}

var userIdentity={
    "type":"object",
    "properties":_.merge({},stringify([
        "type",
        "principalId",
        "arn",
        "accountId",
        "accessKeyId",
     ]))
}

userIdentity.properties.sessionContext={
    "type":"object",
    "properties":{
        attributes,
        sessionIssuer
    }
}

        
var base={
    "type":"object",
    "properties":_.merge({},stringify([
        "eventVersion",
        "eventTime",
        "eventSource",
        "eventName",
        "awsRegion",
        "src_ip",
        "user_agent",
        "requestID",
        "eventID",
        "eventType",
        "apiVersion",
        "recipientAccountId",
     ]))
}
base.properties.src_geoip=require('./geo')
base.properties.userIdentity=userIdentity
module.exports=base

function stringify(name){
    var out={}
    _.each(name,x=>out[x]={"type":"string"})
    return out
}

