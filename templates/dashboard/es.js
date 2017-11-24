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
