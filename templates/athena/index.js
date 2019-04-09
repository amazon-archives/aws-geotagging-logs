/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var Base=require('../util/base')
var arn=require('../util/arn').bucket
var schema=require('./schema')

var table=function(name,bucket){
    return {
        "Type": "Custom::AthenaTable",
        "DependsOn":"Policy",
        "Properties": {
            "ServiceToken":{"Fn::GetAtt":["Lambda","Arn"]},
            "Name":name,
            "location":{"Ref":"DataBucket"},
            "prefix":name,
            "Database":{"Fn::GetAtt":["Database","Name"]},
            "MetaDataBucket":{"Ref":"MetaDataBucket"},
            Schema:schema[name]
        }
    }
}
var out=Base(
    "Athena database of log information",
    {
        "BootstrapBucket":"String",
        "DataBucket":"String"
    })

out.Resources=Object.assign(
    require('../util/bucket')("MetaDataBucket").resource,
    require('./cfn-athena'),
    require('./cfn-wait'),
    require('./queries'),
    {
    "Wait":{
        "Type": "Custom::Wait",
        "Properties": {
            "ServiceToken": { "Fn::GetAtt" : ["WaitLambda", "Arn"] },
            "time":"10"
        }
    },   
    "Policy": {
      "Type": "AWS::IAM::ManagedPolicy",
      "Properties": {
        "PolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Action": [
                "s3:*"
              ],
              "Resource": [
                arn("DataBucket"),
                arn("DataBucket",["/*"]),
                arn("MetaDataBucket"),
                arn("MetaDataBucket",["/*"])
             ]            
          }]
        },
        "Roles":[{"Ref":"Role"}]
      }
    },
    "Database":{
        "Type": "Custom::AthenaDatabase",
        "DependsOn":["Policy","Wait"],
        "Properties": {
            "ServiceToken":{"Fn::GetAtt":["Lambda","Arn"]},
            "Name":{"Ref":"AWS::StackName"},
            "MetaDataBucket":{"Ref":"MetaDataBucket"}
        }
    },
    "Flowlogs":table("flowlogs"),
    "Cloudtrail":table("cloudtrail"),
    "Cloudfront":table("cloudfront"),
    "ELB":table("elb")
  })

module.exports=out
