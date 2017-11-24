/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
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
