/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
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


