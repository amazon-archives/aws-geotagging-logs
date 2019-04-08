/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

module.exports={
"LogPolicy":{
    "Type": "AWS::IAM::ManagedPolicy",
    "Properties": {
        "PolicyDocument":{
            "Version": "2012-10-17",
            "Statement": [{
              "Sid": "CloudWatchLogsPolicy",
              "Effect": "Allow",
              "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
                "logs:DescribeLogStreams"
              ],
              "Resource": [
                "*"
              ]
            }]
        }
    }
},
"KinesisPut":{
    "Type": "AWS::IAM::ManagedPolicy",
    "Properties": {
        "PolicyDocument":{
            "Version": "2012-10-17",
            "Statement": [{
              "Effect": "Allow",
              "Action": [
                "firehose:PutRecord",
                "firehose:PutRecordBatch"
              ],
              "Resource": [
                require('../../util/arn').hose("FlowlogsHose"),
                require('../../util/arn').hose("CloudtrailHose"),
                require('../../util/arn').hose("CloudfrontHose"),
                require('../../util/arn').hose("ELBHose")
              ]
            }]
        }
    }
},
"BucketPolicy":{
    "Type": "AWS::IAM::ManagedPolicy",
    "Properties": {
        "PolicyDocument":{
            "Version": "2012-10-17",
            "Statement": [{
              "Effect": "Allow",
              "Action": [
                "s3:*"
              ],
              "Resource": [
                require('../../util/arn').bucket("DataBucket"),
                require('../../util/arn').bucket("DataBucket",['/*'])
              ]
            }]
        }
    }
}
}





           
