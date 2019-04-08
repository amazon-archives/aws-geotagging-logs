/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

module.exports=function(x,y,height,text){
    return [{
        "type": "text",
        "x": x,
        "y": y,
        "width": 24,
        "height": height,
        "properties": {
            "markdown":text
        }
    }]
}
