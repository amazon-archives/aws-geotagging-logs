/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

module.exports=function(name){
    return {
    "MetricLambda": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {"Ref": "BootstrapBucket"},
          "S3Key": "lambda/metrics.zip"
        },
        "Handler": "index.handler",
        "MemorySize": "256",
        "Role": {"Fn::GetAtt": ["MetricRole", "Arn"]},
        "Runtime": "nodejs6.10",
        "Timeout": 60,
        "Tags": [{"Key": "name", "Value": "vmware-metric"}]
      }
    },
    "MetricRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {"Service": "lambda.amazonaws.com"},
              "Action": "sts:AssumeRole"
            }
          ]
        },
        "Path": "/",
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
          {"Ref": "PutMetricPolicy"}
        ]
      }
    },
    "PutMetricPolicy": {
      "Type": "AWS::IAM::ManagedPolicy",
      "Properties": {
        "PolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [{
              "Effect": "Allow",
              "Action": [
                "cloudwatch:PutMetricData"
              ],
              "Resource": ["*"]
            }]
        }
      }
    },
    "MetricsCloudwatchLambdaPermission":{
        "Type" : "AWS::Lambda::Permission",
        "Properties" : {
            "Action" : "lambda:InvokeFunction",
            "FunctionName" : {"Fn::GetAtt":["MetricLambda","Arn"]},
            "Principal" : {"Fn::Join":[".",[
                "logs",{"Ref":"AWS::Region"},"amazonaws.com"
            ]]},
            "SourceAccount":{"Ref":"AWS::AccountId"}
        }
    },
    "LambdaLog":{
        "Type" : "AWS::Logs::LogGroup",
        "DeletionPolicy": "Delete" ,
        "Properties" : {
            "LogGroupName" : {"Fn::Join":["",[
                "/aws/lambda/",
                {"Ref":name}
            ]]},
            "RetentionInDays" : 1
        }
    },
    "MetricsCloudWatchTrigger":{
        "Type" : "AWS::Logs::SubscriptionFilter",
        "DependsOn":["MetricsCloudwatchLambdaPermission",name],
        "Properties" : {
            "DestinationArn" : {"Fn::GetAtt":["MetricLambda","Arn"]},
            "FilterPattern" : "",
            "LogGroupName" : {"Ref":"LambdaLog"}
        }
    }
    }
}




