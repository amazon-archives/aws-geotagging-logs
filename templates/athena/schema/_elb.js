/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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


