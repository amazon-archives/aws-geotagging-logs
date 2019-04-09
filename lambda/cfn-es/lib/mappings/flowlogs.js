/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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


