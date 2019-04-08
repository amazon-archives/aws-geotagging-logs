/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

module.exports=function(metrics,position){
    var base={
        "type": "metric",
        "properties": {
            "view": "timeSeries",
            "stacked": false,
            metrics,
            "region": "us-west-2"
        }
    }
    return Object.assign(base,position)
}
