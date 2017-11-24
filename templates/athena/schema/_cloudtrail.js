/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
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

