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
    "type":"object",
    "properties":{
        "version":{"type":"string"},
        "account_id":{"type":"string"},
        "interface_id":{"type":"string"},
        "src_ip":{"type":"string"},
        "dst_ip":{"type":"string"},
        "src_port":{"type":"string"},
        "protocol":{"type":"string"},
        "packets":{"type":"string"},
        "action":{"type":"string"},
        "log_status":{"type":"string"},
        "bytes":{"type":"bigint"},
        src_geoip:require('./geo'),
        dst_geoip:require('./geo')
    }
}


