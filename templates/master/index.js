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
  "Metadata" : {
    "AWS::CloudFormation::Interface" : {
        "ParameterGroups" : [
            {
                "Label":"User",
                "Parameters":["Username","Password"]
            },
            {
                "Label":"VPC",
                "Parameters":["VPC"]
            },
            {
                "Label":"Logs",
                "Parameters":["ELBBucket","CloudFrontBucket"]
            },
            {
                "Label":"Kibana",
                "Parameters":["ZoneId","Cert","UrlPostFix"]
            }
        ]
    }
  },
  "Resources": Object.assign({
        "DataBucket":{
           "Type": "AWS::S3::Bucket",
            "Properties": {}
        },
        "LogGroup" :{
            "Type":"AWS::Logs::LogGroup",
            "Properties" : {
                "RetentionInDays" : 1
            }
        }
    },
    require('./stacks'),
    require('./flowlogs'),
    require('./Cloudtrail')
   ),
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "Elastic search analysis of vpc flowlogs and cloudtrail logs",
  "Parameters":{
        "Username":{
            "Type":"String",
            "Description":"Username to login to Kibana"
        },
        "Password":{
            "Type":"String",
            "Description":"Password to authenticate user to Kibana",
            "AllowedPattern":"(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*\\p{Punct}).*",
            "ConstraintDescription":"Password must have a length of at least 8, contain upper case, lower case, numbers, and special characters.",
            "NoEcho":true
        },
        "VPC":{
            "Type":"AWS::EC2::VPC::Id",
            "Description":"VPC to get flowlogs from and put Kibana proxy server"
        },
        "Cert":{
            "Type":"String",
            "Default":"NONE",
            "Description":"AWS Certificate Manager Cert Arn for the domain name, required if using elasticsearch"
        },
        "ZoneId":{
            "Type":"String",
            "Default":"NONE",
            "Description":"AWS Route53 zoneId of the domain name, required if using elasticsearch"
        },
        "UrlPostfix":{
            "Type":"String",
            "Default":"",
            "Description":"Optinal post fix to kibana url name eg. kibana-{postfix}.{ZoneName}."
        },
        "BootstrapBucket":{
            "Type":"String",
            "Description":"bucket that holds assets for this template. Do not change."
        },
        "CloudFrontBucket":{
            "Type":"String",
            "Description":"bucket where cloudfront access logs are delivered",
        },
        "ELBBucket":{
            "Type":"String",
            "Description":"bucket where elb access logs are delivered",
        },
        ElasticSearchOrAthena:{
            "Type":"String",
            "AllowedValues":["Athena","ElasticSearch","Both"],
            "Default":"Both",
            "Description":"Whether to launch an Elasticsearch Cluster,Athena tables, or both",
        }
  },
  "Outputs":{
    "KibanaUrl":{
        "Value":{"Fn::If":[
            "CreateElasticSearch",
            {"Fn::GetAtt":["es","Outputs.KibanaUrl"]},
            "EMPTY"
        ]}
    }
  },
  Conditions:{
    CreateElasticSearch:conditional("ElasticSearch"),
    CreateAthena:conditional("Athena")
  }
}

function conditional(key){
    return {"Fn::Or":[
        {"Fn::Equals":[{"Ref":"ElasticSearchOrAthena"},key]},
        {"Fn::Equals":[{"Ref":"ElasticSearchOrAthena"},"Both"]}
    ]}
}


