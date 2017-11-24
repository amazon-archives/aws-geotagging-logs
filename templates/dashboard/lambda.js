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

