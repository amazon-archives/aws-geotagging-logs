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
        "sent_bytes":{"type":"integer"},
        "recived_bytes":{"type":"integer"},
        "src_ip":{"type":"ip"},
        "src_geoip":require('./geo'),
        "user_agent":{"type":"string"},
        "eventTime":{"type":"date"},
        "protocol":{"type":"string","index" : "not_analyzed"},
        "method":{"type":"string","index" : "not_analyzed"},
        "host":{"type":"string","index" : "not_analyzed"},
        "uri":{"type":"string","index" : "not_analyzed"},
        "status_code":{"type":"string","index" : "not_analyzed"},
        "time_taken":{"type":"float"},
        "HTTP_version":{"type":"string","index" : "not_analyzed"},
        "edge_location_id":{"type":"string","index" : "not_analyzed"},
        "edge_location":{"type":"geo_point"},
        "referer":{"type":"string","index" : "not_analyzed"},
        "x_edge_result_type":{"type":"string","index" : "not_analyzed"},
        "x_edge_response_result_type":{"type":"string","index" : "not_analyzed"},
        "x_edge_request_id":{"type":"string","index" : "not_analyzed"},
        "x_host_header":{"type":"string","index" : "not_analyzed"},
    }
}


