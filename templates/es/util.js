/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

module.exports={
    "UtilLambda": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {"Ref":"BootstrapBucket"},
          "S3Key": "lambda/cfn-s3.zip"
        },
        "Handler": "handler.handler",
        "MemorySize": "128",
        "Role": {
          "Fn::GetAtt": ["utilLambdaRole","Arn"]
        },
        "Runtime": "nodejs6.10",
        "Timeout": 60,
        "Tags":[{
            "Key":"name",
            "Value":"geotag-cfn-s3"
        }]
      }
    },
    "utilLambdaRole": {
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
        "Policies":[{
            "PolicyName":"Bucket",
            "PolicyDocument": {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Effect": "Allow",
                  "Action": [
                    "s3:PutBucketNotification"
                  ],
                  "Resource": [{"Fn::Join":["",[
                    "arn:aws:s3:::",
                    {"Ref": "DataBucket"}
                  ]]}]
                }
              ]
            }
        }],
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
        ]
      }
    }
}
 
