/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

module.exports={
    "Domain":{
        "Type" : "AWS::Elasticsearch::Domain",
        "Properties" : {
            "ElasticsearchClusterConfig":{
                "DedicatedMasterEnabled" : true,
                "DedicatedMasterCount":2,
                "DedicatedMasterType":"m4.large.elasticsearch",
                "InstanceCount" : 4,
                "InstanceType" : "m4.large.elasticsearch",
                "ZoneAwarenessEnabled" : true
            },
            "EBSOptions":{
                "EBSEnabled" : true,
                "VolumeSize" : 10,
                "VolumeType" : "gp2"
            },
            "ElasticsearchVersion":"5.1",
            "AdvancedOptions":{
                "rest.action.multi.allow_explicit_index":true
            }
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
                "es:*"
              ],
              "Resource": [
                {"Fn::Join": ["/",[
                    {"Fn::GetAtt":["Domain","DomainArn"]},"*"
                ]]},
                {"Fn::GetAtt":["Domain","DomainArn"]}
              ]
            }
          ]
        }
      }
    }
}
