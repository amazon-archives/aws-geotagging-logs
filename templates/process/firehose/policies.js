/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
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





           
