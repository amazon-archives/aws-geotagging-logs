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
        "elb":{"type":"string"},
        "src_ip":{"type":"string"},
        "src_port":{"type":"string"},
        "dst_ip":{"type":"string"},
        "dst_port":{"type":"string"},
        "status_code":{"type":"string"},
        "backend_status_code":{"type":"string"},
        "request":{"type":"string"},
        "protocol":{"type":"string"},
        "Host":{"type":"string"},
        "Port":{"type":"string"},
        "uri":{"type":"string"},
        "HTTP_verion":{"type":"string"},
        "user_agent":{"type":"string"},
        src_geoip:require('./geo.json'),
        "request_process_time":{"type":"float"},
        "backend_process_time":{"type":"float"},
        "response_process_time":{"type":"float"},
        "time_taken":{"type":"float"},
        "recived_bytes":{"type":"bigint"},
        "sent_bytes":{"type":"bigint"},
    }
}


