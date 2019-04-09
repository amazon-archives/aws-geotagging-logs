/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

exports.bucket=function(name,file=[]){
    return {"Fn::Join":["",[
        "arn:aws:s3:::",
        {Ref:name}
    ].concat(file)]}
}

exports.hose=function(name){
    return {"Fn::Join":["",[ 
        "arn:aws:firehose:",
        {"Ref":"AWS::Region"},
        ":",
        {"Ref":"AWS::AccountId"},
        ":deliverystream/",
        {"Ref":name}
    ]]}
}
