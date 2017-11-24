/*license
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var generator = require('generate-password');

module.exports={
  "Resources": {
    "param":{"Type" : "AWS::SSM::Parameter",
        "Properties" : {
            "Name" : "GEOTAG-DEV-PASSWORD",
            "Description" : "password for development resources",
            "Type" : "String",
            "Value" :generator.generate({
                length: 10,
                numbers: true,
                symbols: true,
                uppercase: true,
                strict: true
            }) 
        }
    },
    "Bucket": {
       "Type": "AWS::S3::Bucket",
      "Properties": {}
    },
    "ReadPolicy":{
    "Type" : "AWS::S3::BucketPolicy",
    "Properties" : {
        "Bucket" : {"Ref":"Bucket"},
        "PolicyDocument" : {
            "Version":"2012-10-17",
            "Statement":[{
                "Sid":"PublicReadForGetBucketObjects",
                "Effect":"Allow",
                "Principal": {"AWS":{"Ref":"AWS::AccountId"}},
                "Action":["s3:Get*","s3:List*"],
                "Resource":[
                    {"Fn::Join":["",[
                        "arn:aws:s3:::",
                        {"Ref":"Bucket"},
                        "/*"
                    ]]},
                    {"Fn::Join":["",[
                        "arn:aws:s3:::",
                        {"Ref":"Bucket"}
                    ]]}
                ]
            }]
        }
    }
    }
  },
  "Conditions": {},
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "Bucket for geotag-demo assets",
  "Mappings": {},
  "Outputs": {
    "Bucket": {
      "Value": {
        "Ref": "Bucket"
      },
      "Export":{
        "Name":"GEOTAG-BOOTSTRAP-BUCKET"
      }
    }
  },
  "Parameters": {}
}
