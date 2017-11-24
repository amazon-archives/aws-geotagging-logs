/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

exports.bucket=function(name){
    return {"Fn::Join":["",[
        "https://s3.console.aws.amazon.com/s3/buckets/",
        {Ref:name},
        "?region=",{Ref:"AWS::Region"},
        "&tab=overview"
    ]]}
}
exports.logs=function(name){
    return {"Fn::Join":["",[
        "https://",
        {"Ref":"AWS::Region"},
        ".console.aws.amazon.com/cloudwatch/home?",
        "region=",{"Ref":"AWS::Region"},
        "#logStream:group=",{"Ref":name}
    ]]}
}

exports.lambda=function(name){
    return {"Fn::Join":["",[
            "https://console.aws.amazon.com/lambda/home?",
            "region=",{"Ref":"AWS::Region"},
            "#/functions/",{"Ref":name},
            "?tab=monitoring"
        ]]}
}
exports.hose=function(name){
    return {"Fn::Join":["",[
            "https://",{"Ref":"AWS::Region"},
            ".console.aws.amazon.com/firehose/home?",
            "region=",{"Ref":"AWS::Region"},
            "#/details/",{"Ref":name},
            "?edit=false"
        ]]}
}
exports.stream=function(name){
    return {"Fn::Join":["",[
           "https://",{"Ref":"AWS::Region"},
           ".console.aws.amazon.com/kinesis/home?",
           "region=",{"Ref":"AWS::Region"},
           "#/streams/details?streamName=",{"Fn::GetAtt":[name,"Outputs.Stream"]}
        ]]}
}
