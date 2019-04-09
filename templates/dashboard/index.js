/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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





