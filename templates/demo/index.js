/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var stack=require('../util/stack.js')
var fs=require('fs')

module.exports={
  "Resources":{
    "demo":stack('master',{
        "Username":"admin",
        "Password":"S^Ejvm8u$79zd",
        "VPC":"vpc-df9e3cb9",
        "Cert":"arn:aws:acm:us-west-2:015196507315:certificate/654098ba-4740-4955-9169-1970a33a22c8",
        "ZoneId":"Z13S60MXSB1NCU",
        "UrlPostfix":"demo-1",
        "CloudFrontBucket":"demo1awslogs",
        "ELBBucket":"demo-session-logs"
    },null,{"Fn::ImportValue":"GEOTAG-BOOTSTRAP-BUCKET"})
  },
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "Elastic search analysis of vpc flowlogs and cloudtrail logs"
}

fs.writeFileSync(__dirname+'/demo.json',JSON.stringify(module.exports))
