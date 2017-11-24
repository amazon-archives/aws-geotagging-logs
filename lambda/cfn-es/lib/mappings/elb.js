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
        "src_ip":{"type":"ip"},
        "src_port":{"type":"string"},
        "src_geoip":require('./geo'),
        "dst_ip":{"type":"ip"},
        "dst_port":{"type":"string"},
        "user_agent":{"type":"string"},
        "recived_bytes":{"type":"integer"},
        "sent_bytes":{"type":"integer"},
        "eventTime":{"type":"date"},
        "method":{"type":"string","index" : "not_analyzed"},
        "protocol":{"type":"string","index" : "not_analyzed"},
        "Host":{"type":"string","index" : "not_analyzed"},
        "Port":{"type":"string","index" : "not_analyzed"},
        "uri":{"type":"string","index" : "not_analyzed"}, 
        "status_code":{"type":"string","index" : "not_analyzed"},
        
        "time_take":{"type":"float"},
        "elb":{"type":"string","index" : "not_analyzed"},
        "request_process_time":{"type":"float"},
        "backend_process_time":{"type":"float"},
        "response_process_time":{"type":"float"},
        "backend_status_code":{"type":"string","index" : "not_analyzed"},
        "HTTP_verion": {"type":"string","index" : "not_analyzed"},
    }
}


