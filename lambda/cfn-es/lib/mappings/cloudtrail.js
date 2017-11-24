/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var sessionIssuer={
    type:"object",
    properties:{
        "type":{"type":"string","index" : "not_analyzed"},
        "principalId":{"type":"string","index" : "not_analyzed"},
        "arn":{"type":"string","index" : "not_analyzed"},
        "accountId":{"type":"string","index" : "not_analyzed"},
        "userName":{"type":"string","index" : "not_analyzed"}
}}
var attributes={
    type:"object",
    properties:{
        "mfaAuthenticated":{"type":"boolean"},
        "creationDate":{"type":"date"},
}}
var sessionContext={
    type:"object",
    properties:{
        sessionIssuer,
        attributes
}}

var userIdentity={
    type:"object",
    properties:{
        "type":{"type":"string","index" : "not_analyzed"},
        "principalId":{"type":"string","index" : "not_analyzed"},
        "arn":{"type":"string","index" : "not_analyzed"},
        "accountId":{"type":"string","index" : "not_analyzed"},
        "accessKeyId":{"type":"string","index" : "not_analyzed"},
        "sessionContext":sessionContext,
}}

module.exports={
    properties:{
        "eventVersion":{"type":"string","index" : "not_analyzed"},
        "eventTime":{"type":"date"},
        "eventSource":{"type":"string","index" : "not_analyzed"},
        "eventName":{"type":"string","index" : "not_analyzed"},
        "awsRegion":{"type":"string","index" : "not_analyzed"},
        "src_ip":{"type":"ip"},
        "user_agent":{"type":"string","index" : "not_analyzed"},
        "requestID":{"type":"string","index" : "not_analyzed"},
        "eventID":{"type":"string"},
        "eventType":{"type":"string","index" : "not_analyzed"},
        "apiVersion":{"type":"string","index" : "not_analyzed"},
        "recipientAccountId":{"type":"string","index" : "not_analyzed"},
        "src_geoip":require('./geo'),
        userIdentity
}}


