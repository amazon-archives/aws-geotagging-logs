/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var widget=require('./widget')
var fs=require('fs')

module.exports=[
    {
        "type": "text",
        "x": 0,
        "y": 12,
        "width": 6,
        "height": 6,
        "properties": {
            "markdown":fs.readFileSync(__dirname+'/links.md','utf8')
        }
    }
]
