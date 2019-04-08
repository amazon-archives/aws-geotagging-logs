/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

module.exports={
    "Trail":{
      "Type" : "AWS::CloudTrail::Trail",
      "DependsOn":"CloudtrailPolicy",
      "Properties" : {
        "EnableLogFileValidation" : true,
        "IncludeGlobalServiceEvents" : true,
        "IsLogging" : true,
        "IsMultiRegionTrail" :true,
        "S3BucketName" : {"Ref":"CloudtrailBucket"}
      }
    },
    "CloudtrailBucket":{
       "Type": "AWS::S3::Bucket",
        "Properties": {}
    },
    "CloudtrailPolicy":{
        "Type" : "AWS::S3::BucketPolicy",
        "Properties" : {
            "Bucket" : {"Ref":"CloudtrailBucket"},
            "PolicyDocument" :{
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Sid": "AWSCloudTrailAclCheck20150319",
                        "Effect": "Allow",
                        "Principal": {"Service": "cloudtrail.amazonaws.com"},
                        "Action": "s3:GetBucketAcl",
                        "Resource": require('../util/arn').bucket("CloudtrailBucket")
                    },
                    {
                        "Sid": "AWSCloudTrailWrite20150319",
                        "Effect": "Allow",
                        "Principal": {"Service": "cloudtrail.amazonaws.com"},
                        "Action": "s3:PutObject",
                        "Resource": require('../util/arn').bucket("CloudtrailBucket",["/*"]),
                        "Condition": {"StringEquals": {"s3:x-amz-acl": "bucket-owner-full-control"}}
                    }
                ]
            }
        }
    }
}
