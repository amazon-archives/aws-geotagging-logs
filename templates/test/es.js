/*license
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var config=require('../../config')

module.exports={
  "Resources": {
    "es":{
        "Type" : "AWS::CloudFormation::Stack",
        "Properties" : {
            "TemplateURL" : {"Fn::Join":["/",[
                "https://s3.amazonaws.com",
                {"Fn::ImportValue":"GEOTAG-BOOTSTRAP-BUCKET"},
                "templates/es.json"
            ]]},
            "Parameters":{
                "BootstrapBucket":{"Fn::ImportValue":"GEOTAG-BOOTSTRAP-BUCKET"},
                "DataBucket":{"Fn::ImportValue":"GEOTAG-BOOTSTRAP-BUCKET"},
                "DomainArn":{"Fn::ImportValue":"GEOTAG-DEV-ES-ARN"},
                "ESPolicy":{"Fn::ImportValue":"GEOTAG-DEV-ES-POLICY"},
                "ESAddress":{"Fn::ImportValue":"GEOTAG-DEV-ES-ADDRESS"},
                "Username":"Admin",
                "Password":{"Ref":"password"},
                "LogGroup":{"Fn::ImportValue":"GEOTAG-DEV-LOG-GROUP"},
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
  "Description": "Test of the elasticseach init"
}
