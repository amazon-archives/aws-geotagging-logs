/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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


