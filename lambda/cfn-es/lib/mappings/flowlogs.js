/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

module.exports={
    properties:{
        "eventTime":{"type":"date"},
        "src_ip":{"type":"ip"},
        "src_port":{"type":"string","index" : "not_analyzed"},
        "dst_ip":{"type":"ip"},
        "src_geoip":require('./geo'),
        "dst_geoip":require('./geo'),
        "protocol":{"type":"string","index" : "not_analyzed"},
        "version":{"type":"integer"},
        "account_id":{"type":"string","index" : "not_analyzed"},
        "interface_id":{"type":"string","index" : "not_analyzed"},
        "securityGroups":{"type":"string","index" : "not_analyzed"},
        "packets":{"type":"long"},
        "bytes":{"type":"long"},
        "start":{"type":"date"},
        "end":{"type":"date"},
        "action":{"type":"string","index" : "not_analyzed"},
        "log_status":{"type":"string","index" : "not_analyzed"}
    }
}


