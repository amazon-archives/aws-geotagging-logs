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
  "Resources":{
    "dashboard":{
        "Type" : "AWS::CloudWatch::Dashboard",
        "Properties" : {
            "DashboardName" : {"Ref":"Name"},
            "DashboardBody" : {"Fn::Sub":JSON.stringify(require('./body'))}
        }
    }
  },
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "Creates a Cloudwatch Dashboard",
  "Mappings": {},
  "Outputs": {
    "name":{
        "Value":{"Ref":"dashboard"}
    },
    "Url":{
        "Value":{"Ref":"dashboard"}
    }
  },
  "Parameters": {
    "Name":{"Type":"String"}
  }
}





