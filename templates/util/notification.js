/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var resources={
    "UtilLAMBDA": {
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
            "BUCKETNAMERole",
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
    "Role": {
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
        }],
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
        ]
      }
    },
    "S3LAMBDAPermission":{
        "Type" : "AWS::Lambda::Permission",
        "Properties" : {
            "Action" : "lambda:InvokeFunction",
            "FunctionName" : {"Fn::GetAtt":["LAMBDA","Arn"]},
            "Principal" : "s3.amazonaws.com",
            "SourceAccount":{"Ref":"AWS::AccountId"},
            "SourceArn":{"Fn::Join":["",[
                "arn:aws:s3:::",
                {"Ref":"BUCKETNAME"}
            ]]}
        }
    },
    "Notificiation":{
        "Type": "Custom::Notification",
        "DependsOn":["BUCKETNAMES3LAMBDAPermission"],
        "Properties": {
            "ServiceToken": { "Fn::GetAtt" : ["BUCKETNAMEUtilLAMBDA", "Arn"] },
            "Bucket":{"Ref":"BUCKETNAME"},
            "NotificationConfiguration": { 
                "LambdaFunctionConfigurations": [{
                    "Events": [ 
                       "s3:ObjectCreated:*"
                    ],
                    "LambdaFunctionArn":{"Fn::GetAtt":["LAMBDA","Arn"]}
                }]
            }
        }
    }
}
 
module.exports=function(name,lambda="Lambda"){
    var tmp=JSON.parse(
        JSON.stringify(resources)
        .replace(/BUCKETNAME/gm,name)
        .replace(/LAMBDA/gm,lambda)
    )
    var out={}
    for(x in tmp){
        out[name+x]=tmp[x]
    }
    return out
}


