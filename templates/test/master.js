/*license
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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
