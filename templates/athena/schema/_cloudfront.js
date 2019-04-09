/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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

