/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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


