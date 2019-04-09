/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var resources={
    "BUCKETNAME":{
        "Type" : "AWS::S3::Bucket",
        "DeletionPolicy":"Delete",
        "Properties" : {}
    },
    "Clear":{
        "Type": "Custom::Clear",
        "DependsOn":"BUCKETNAME",
        "Properties": {
            "ServiceToken": { "Fn::GetAtt" : ["BucketLambda", "Arn"] },
            "Bucket":{"Ref":"BUCKETNAME"}
        }
    },
    "BucketLambda": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {"Ref":"BootstrapBucket"},
          "S3Key": "lambda/cfn-s3.zip"
        },
        "Environment": {
          "Variables": {
            "REGION": {
              "Ref": "AWS::Region"
            }
          }
        },
        "Handler": "handler.handler",
        "MemorySize": "128",
        "Role": {
          "Fn::GetAtt": [
            "BucketLambdaRole",
            "Arn"
          ]
        },
        "Runtime": "nodejs6.10",
        "Timeout": 60,
        "Tags":[{
            "Key":"name",
            "Value":"vmware-cfn-s3"
        }]
      }
    },
    "BucketLambdaPolicy": {
      "Type": "AWS::IAM::ManagedPolicy",
      "Properties": {
        "PolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Action": [
                "s3:DeleteObject",
                "s3:ListBucket",
                "s3:PutBucketNotification"
              ],
              "Resource": [
                {"Fn::Join":["",[
                    "arn:aws:s3:::",
                    {"Ref": "BUCKETNAME"},
                    "/*"
                ]]},
                {"Fn::Join":["",[
                    "arn:aws:s3:::",
                    {"Ref": "BUCKETNAME"}
                ]]}
              ]
            }
          ]
        }
      }
    },
    "BucketLambdaRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              },
              "Action": "sts:AssumeRole"
            }
          ]
        },
        "Path": "/",
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
          {
            "Ref": "BucketLambdaPolicy"
          }
        ]
      }
    }
}
 
module.exports=function(name){
    return {
        resource:JSON.parse(JSON.stringify(resources).replace(/BUCKETNAME/gm,name)),
        Url:require('./url').bucket(name)
    }
}


