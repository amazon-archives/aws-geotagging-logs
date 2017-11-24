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
        "edge_location_id":{"type":"string"},
        "src_ip":{"type":"string"},
        "method":{"type":"string"},
        "uri":{"type":"string"},
        "status_code":{"type":"string"},
        "referer":{"type":"string"},
        "user_agent":{"type":"string"},
        "edge_result_type":{"type":"string"},
        "edge_request_id":{"type":"string"},
        "host_header":{"type":"string"},
        "protocol":{"type":"string"},
        "edge_response_result_type":{"type":"string"},
        "HTTP_version":{"type":"string"},
        "eventTime":{"type":"bigint"},
        "recived_bytes":{"type":"bigint"},
        "sent_bytes":{"type":"bigint"},
        "time_taken":{"type":"float"},
        "edge_location_lat":{"type":"float"},
        "edge_location_lon":{"type":"float"},
        src_geoip:require('./geo')
    }
}

