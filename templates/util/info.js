/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
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
