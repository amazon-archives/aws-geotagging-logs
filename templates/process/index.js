/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var url=require('../util/url')

module.exports={
"AWSTemplateFormatVersion": "2010-09-09",
"Description": "Provides a lambda function to send logs to kinesis",
"Outputs":{
    "IngestConsoleURL":{
        "Value":url.lambda("Lambda")
    },
    "LogsConsoleURL":{
        "Value":url.logs("LogGroup")
    },
    "FlowlogsHoseConsoleUrl":{
        Value:url.hose('FlowlogsHose')
    },
    "CloudtrailHoseConsoleUrl":{
        Value:url.hose('CloudtrailHose')
    },
    "CloudfrontHoseConsoleUrl":{
        Value:url.hose('CloudtrailHose')
    },
    "ELBHoseConsoleUrl":{
        Value:url.hose('CloudtrailHose')
    }
},
"Parameters":{
    "BootstrapBucket":{
        "Type":"String"
    },
    "DataBucket":{"Type":"String"},
    "CloudtrailBucket":{"Type":"String"},
    "ELBBucket":{"Type":"String"},
    "CloudFrontBucket":{"Type":"String"},
    "FlowLogs":{"Type":"String"},
    "LogGroup":{"Type":"String"}
},
Resources:Object.assign({},
    require('./lambda'),
    require('./triggers'),
    require('./logs'),
    require('./firehose'),
    require('../util/metrics')('Lambda'),
    require('../util/notification')("CloudtrailBucket"),
    require('../util/notification')("ELBBucket"),
    require('../util/notification')("CloudFrontBucket")
)
}
