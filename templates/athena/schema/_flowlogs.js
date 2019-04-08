/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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


