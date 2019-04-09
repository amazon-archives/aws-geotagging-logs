/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

module.exports={
    "process":stack('process',{
        "CloudtrailBucket":ref("CloudtrailBucket"),
        "ELBBucket":ref("ELBBucket"),
        "CloudFrontBucket":ref("CloudFrontBucket"),
        "FlowLogs":ref("FlowLogGroup"),
        "LogGroup":ref("LogGroup"),
        "DataBucket":ref("DataBucket")
    }),
    "Domain":stack('domain',{},"CreateElasticSearch"),
    "es":stack('es',{
        "DataBucket":ref("DataBucket"),
        "DomainArn":get("Domain","Arn"),
        "ESPolicy":get("Domain","Policy"),
        "ESAddress":get("Domain","Address"),
        "Username":ref("Username"),
        "Password":ref("Password"),
        "UrlPostfix":ref("UrlPostfix"),
        "Cert":ref("Cert"),
        "ZoneId":ref("ZoneId"),
        "LogGroup":ref("LogGroup")
    },"CreateElasticSearch"),
    "athena":stack('athena',{
        "DataBucket":ref("DataBucket")
    },"CreateAthena")
}

function ref(name){ return {"Ref":name} }
function get(stack,name){ return {"Fn::GetAtt":[stack,"Outputs."+name]}}

function stack(name,parameters,condition){
    var out={
        "Type" : "AWS::CloudFormation::Stack",
        "Properties" : {
            "TemplateURL" : {"Fn::Join":["/",[
                "https://s3.amazonaws.com",
                {"Ref":"BootstrapBucket"},
                "templates/"+name+'.json'
            ]]},
            "Parameters":Object.assign({
                "BootstrapBucket":{"Ref":"BootstrapBucket"}
            },parameters)
        }
    }
    if(condition){
        out.Condition=condition
    }
    return out
}
