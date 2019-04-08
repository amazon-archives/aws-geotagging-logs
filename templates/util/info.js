/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var bucket=(require('../util/bucket'))('FailBucket')
var url=require('../util/url')

module.exports={
"AWSTemplateFormatVersion": "2010-09-09",
"Description": "Provides a kinesis firehose to put records into ElasticSearch",
"Outputs":{
    "KinesisPolicy":{
        "Value":{"Ref":"KinesisPut"}
    },
    "FlowlogsHose":{
        "Value":{"Ref":"HoseEsFlowlogs"}
    },
    "FailBucketConsoleUrl":{
        "Value":bucket.Url
    },
    "FlowlogsHoseConsoleUrl":{
        "Value":url.hose('HoseEsFlowlogs')
    },
    "CloudtrailHose":{
        "Value":{"Ref":"HoseEsCloudtrail"}
    },
    "CloudtrailHoseConsoleUrl":{
        "Value":url.hose('HoseEsCloudtrail')
    }
},
"Parameters":{
    "ElasticSearchAccessPolicy":{
        "Type":"String"
    },
    "Index":{
        "Type":"String"
    },
    "BootstrapBucket":{
        "Type":"String"
    },
    "DomainARN":{
        "Type":"String"
    }
},
Resources:Object.assign(
    require('./kinesis'),
    require('./logs'),
    require('./policies'),
    require('./roles'),
    bucket.resource
)
}
