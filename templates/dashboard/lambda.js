/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var widget=require('./widget')

module.exports=[
    widget([
        [ "AWS/Lambda", "Invocations", "FunctionName", "VMWARE-master-57-Master-1U7E6WIIFWOHB-inges-Lambda-12DH7WDXW2EMU" ],
        [ ".", "Errors", ".", "VMWARE-master-57-Master-1U7E6WIIFWOHB-i-AvroLambda-VOKHNJTUC84Q" ]
    ],{
        "x": 0,
        "y": 6,
        "width": 6,
        "height": 6
    }),
    widget([
        [ "AWS/Lambda", "Duration", "FunctionName", "VMWARE-master-57-Master-1U7E6WIIFWOHB-inges-Lambda-12DH7WDXW2EMU" ],
        [ "vmware-demo", "lambda-used-memory", "function", ".", { "yAxis": "right", "stat": "Average" } ]
    ],{
        "x": 0,
        "y": 6,
        "width": 6,
        "height": 6
    })
] 

