/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var _=require('lodash')
var types=['flowlogs','cloudtrail','cloudfront','elb']
module.exports=_.assign(
    lambda('flowlogs'),
    lambda('cloudtrail'),
    lambda('cloudfront'),
    lambda('elb'),
    {Notification:{
        "Type": "Custom::Notification",
        "DependsOn":types.map(name=>{
            var Name=name[0].toUpperCase()+name.slice(1)
            return Name+"LambdaPermission"
        }),
        "Properties": {
            "ServiceToken": { "Fn::GetAtt" : ["UtilLambda", "Arn"] },
            "Bucket":{"Ref":"DataBucket"},
            "NotificationConfiguration": { 
                "LambdaFunctionConfigurations":types.map(x=>trigger(x))
            }
        }
    }}
)

function lambda(name){
    var Name=name[0].toUpperCase()+name.slice(1)
    var tmp={
        Lambda:{
            "Type" : "AWS::Lambda::Function",
            "Properties" : {
                "Code" :{
                    "S3Bucket" : {"Ref":"BootstrapBucket"},
                    "S3Key" : "lambda/ingest.zip"
                },
                "Environment" :{
                    "Variables":{
                        "HOSE":{"Ref":Name+"Hose"},
                        "LOG_GROUP":{"Ref":"LogGroup"},
                        "LOG_STREAM":{"Ref":Name+"LambdaLog"}
                    }
                },
                "Handler" : "index.handler",
                "MemorySize" : "256",
                "Role" : {"Fn::GetAtt":["LambdaRole","Arn"]},
                "Runtime" : "nodejs6.10",
                "Timeout" : 60,
                "Tags":[{
                    "Key":"name",
                    "Value":"geotag-ingest"
                }]
            }
        },
        LambdaLog:{
            "Type" : "AWS::Logs::LogStream",
            "Properties" : {
                "LogGroupName" : {"Ref":"LogGroup"},
                "LogStreamName": ["Ingest","Erros",name].join('-')
            }
        },
        LambdaPermission:{
            "Type" : "AWS::Lambda::Permission",
            "Properties" : {
                "Action" : "lambda:InvokeFunction",
                "FunctionName" : {"Fn::GetAtt":[Name+"Lambda","Arn"]},
                "Principal" : "s3.amazonaws.com",
                "SourceAccount":{"Ref":"AWS::AccountId"},
                "SourceArn":{"Fn::Join":["",[
                    "arn:aws:s3:::",
                    {"Ref":"DataBucket"}
                ]]}
            }
        },
        
    }

    var out={}
    _.forEach(tmp,(value,key)=>out[Name+key]=value)
    return out
}

function trigger(name){
    var Name=name[0].toUpperCase()+name.slice(1)
    return {
        "Events": [ "s3:ObjectCreated:*"],
        "LambdaFunctionArn":{"Fn::GetAtt":[Name+"Lambda","Arn"]},
        "Filter":{
            Key:{
                FilterRules:[{
                    Name:"prefix",
                    Value:name
                }]
            }
        }
    }
}

