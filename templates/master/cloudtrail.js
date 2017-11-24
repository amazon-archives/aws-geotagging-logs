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
