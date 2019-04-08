/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

module.exports={
  "Conditions": {},
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "initalize ElasticSearch Cluster and kibana",
  "Mappings":{
        "RegionMap" : {
          "us-east-1"      : { "64" : "ami-a4c7edb2" },
          "us-east-2"      : { "64" : "ami-8a7859ef" },
          "us-west-1"      : { "64" : "ami-327f5352" },
          "us-west-2"      : { "64" : "ami-6df1e514" },
          "eu-west-1"      : { "64" : "ami-d7b9a2b1" }
        }
    },
    "Parameters": {
        "BootstrapBucket":{"Type":"String"},
        "DataBucket":{"Type":"String"},
        "LogGroup":{"Type":"String"},
        "DomainArn":{"Type":"String"},
        "ESAddress":{"Type":"String"},
        "ESPolicy":{"Type":"String"},
        "Username":{"Type":"String","NoEcho":true},
        "Password":{
            "Type":"String",
            "NoEcho":true,
            "AllowedPattern":"(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*\\p{Punct}).*",
            "ConstraintDescription":"Password must have a length of at least 8, contain upper case, lower case, numbers, and special characters."
        },
        "ServerInstance":{
            "Type":"String",
            "Default":"t2.nano"
        },
        "Cert":{
            "Type":"String",
        },
        "ZoneId":{
            "Type":"String",
        },
        "UrlPostfix":{
            "Type":"String",
            "Default":""}
    },
    "Outputs": { 
        "LogsConsoleUrl":{
            "Value":require('../util/url').logs("Logs")
        },
        "KibanaUrl":{
            "Value":{"Fn::Join":["",[
                "https://",
                {"Ref":"URL"},
                "/_plugin/kibana"
            ]]}
        },
        "CodeDeployApp":{
            "Value":{"Ref":"app"}
        },
        "CodeDeployGroup":{
            "Value":{"Ref":"group"}
        }
    },
    "Resources": Object.assign(
        require('./firehose'), 
        require('./init'), 
        require('./lambda'), 
        require('./proxy'),
        require('./logs'),
        require('./util')
    )
}
