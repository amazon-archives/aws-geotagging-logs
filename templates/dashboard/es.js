/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var widget=require('./widget')
module.exports=function(x,y,height){
    return [
        widget([
            [ "AWS/ES", "FreeStorageSpace", "DomainName", "${Domain}", "ClientId", "${AWS::AccountId}" ],
            [ ".", "SearchableDocuments", ".", ".", ".", ".", { "yAxis": "right" } ]
        ],{
            "x": x,
            "y": y,
            "width": 12,
            "height": height
        }),
        widget([
            [ "AWS/ES", "WriteThroughput", "DomainName", "${Domain}", "ClientId", "${AWS::AccountId}" ],
            [ ".", "ReadThroughput", ".", ".", ".", ".", { "yAxis": "left" } ]
        ],{
            "x": x+12,
            "y": y,
            "width": 12,
            "height": height
        })
    ]
}
