/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

module.exports={
  "Conditions": {},
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "ElasticSearch Cluster",
  "Parameters": {
    "BootstrapBucket":{
        "Type":"String"
    }
  },
  "Outputs": {
    "ConsoleUrl":{
        "Value":{"Fn::Join":["",[
            "https://",
            {"Ref":"AWS::Region"},
            ".console.aws.amazon.com/es/home?",
            "region=",{"Ref":"AWS::Region"},
            "#",{"Ref":"Domain"},":dashboard"
        ]]}
    },
    "Arn":{
        "Value":{"Fn::GetAtt":["Domain","DomainArn"]}
    },
    "Address":{
        "Value":{"Fn::GetAtt":["Domain","DomainEndpoint"]}
    },
    "Policy":{
        "Value":{"Ref":"Policy"}
    }
  },
  "Resources": Object.assign(
    require('./domain')
  )
}
