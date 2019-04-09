/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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

