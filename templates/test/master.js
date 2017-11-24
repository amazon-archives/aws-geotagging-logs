/*license
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var config=require('../../config')

module.exports={
  "Resources": {
    "Master":{
        "Type" : "AWS::CloudFormation::Stack",
        "Properties" : {
            "TemplateURL" : {"Fn::Join":["/",[
                "https://s3.amazonaws.com",
                {"Fn::ImportValue":"GEOTAG-BOOTSTRAP-BUCKET"},
                "templates/master.json"
            ]]},
            "Parameters":{
                "BootstrapBucket":{"Fn::ImportValue":"GEOTAG-BOOTSTRAP-BUCKET"},
                "Username":"Admin",
                "Password":{"Ref":"password"},
                "VPC":{"Fn::ImportValue":"GEOTAG-DEV-VPC"},
                "CloudFrontBucket":{"Fn::ImportValue":"GEOTAG-DEV-DATA-BUCKET"},
                "ELBBucket":{"Fn::ImportValue":"GEOTAG-DEV-DATA-BUCKET"},
                "ElasticSearchOrAthena":"ElasticSearch",
                "Cert":config.Cert,
                "ZoneId":config.ZoneId
            }
        }
    }
  },
  "Parameters":{
    "password":{
        "Type":"AWS::SSM::Parameter::Value<String>",
        "Default":"GEOTAG-DEV-PASSWORD"
    }
  },
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "Test of the master template"
}
