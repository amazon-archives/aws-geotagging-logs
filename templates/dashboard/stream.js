/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var widget=require('./widget')

module.exports=[
    widget([
        [ "AWS/Firehose", "IncomingBytes", "DeliveryStreamName", "VMWARE-master-57-Master-1U7E6WIIF-HoseEsCloudfront-1SGKFMALMNIGX" ],
        [ ".", "DeliveryToElasticsearch.Success", ".", ".", { "yAxis": "right" } ]
    ],{
        "x": 12,
        "y": 0,
        "width": 6,
        "height": 6
    }),
    widget([
        [ "AWS/Kinesis", "IncomingBytes", "StreamName", "VMWARE-master-57-Master-1U7E6WIIFWOHB-ingest-1GE93TH347WVS-lambda-ETX-CloudfrontStream-VP4RNNDFGJPI-Stream-L5AAX43XN38U" ],
        [ ".", "GetRecords.Success", ".", ".", { "yAxis": "right" } ]
    ],{
        "x": 18,
        "y": 0,
        "width": 6,
        "height": 6
    })
]
        
