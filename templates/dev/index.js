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
        "cognito":stack('cognito'),
        "domain":stack('domain'),
        "vpc":stack('vpc'),
        "logs":stack('logs'),

        "user":stack('user',['cognito']),
        "kinesis":stack('kinesis',['domain']),
        "elb":stack('elb',['vpc']),
        "cf":stack('cf',['elb']),
    },
    "AWSTemplateFormatVersion": "2010-09-09",
    "Description": "Developer resources for GEOTAG ",
}

function stack(name,depends=null){
    var out={
        "Type" : "AWS::CloudFormation::Stack",
        "Properties" : {
            "TemplateURL" : {"Fn::Join":["/",[
                "https://s3.amazonaws.com",
                {"Fn::ImportValue":"GEOTAG-BOOTSTRAP-BUCKET"},
                "templates/dev/"+name+'.json'
            ]]},
            "Parameters":{}
        }
    }
    if(depends){
        out.DependsOn=depends
    }
    return out
}

