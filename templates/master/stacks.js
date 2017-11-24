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
