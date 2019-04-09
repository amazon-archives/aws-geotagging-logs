/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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


