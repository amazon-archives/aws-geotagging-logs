/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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
