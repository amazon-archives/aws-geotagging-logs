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
  "Conditions": {},
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "ElasticSearch Cluster",
  "Parameters": {
    "BootstrapBucket":{
        "Type":"String"
    }
  },
  "Outputs": {
    "ConsoleUrl":{
        "Value":{"Fn::Join":["",[
            "https://",
            {"Ref":"AWS::Region"},
            ".console.aws.amazon.com/es/home?",
            "region=",{"Ref":"AWS::Region"},
            "#",{"Ref":"Domain"},":dashboard"
        ]]}
    },
    "Arn":{
        "Value":{"Fn::GetAtt":["Domain","DomainArn"]}
    },
    "Address":{
        "Value":{"Fn::GetAtt":["Domain","DomainEndpoint"]}
    },
    "Policy":{
        "Value":{"Ref":"Policy"}
    }
  },
  "Resources": Object.assign(
    require('./domain')
  )
}
