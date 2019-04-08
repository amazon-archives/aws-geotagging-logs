/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var regex=[
    '^',
    '(?<date>\\S*)\t',
    '(?<time>\\S*)\t',
    '(?<edge_location_id>\\S*)\t',
    '(?<sent_bytes>\\S*)\t',
    '(?<src_ip>\\S*)\t',
    '(?<method>\\S*)\t',
    '(?<host>\\S*)\t',
    '(?<uri>\\S*)\t',
    '(?<status_code>\\S*)\t',
    '(?<referer>\\S*)\t',
    '(?<user_agent>\\S*)\t',
    '(?<query_string>\\S*)\t',
    '(?<cookie>\\S*)\t',
    '(?<edge_result_type>\\S*)\t',
    '(?<edge_request_id>\\S*)\t',
    '(?<host_header>\\S*)\t',
    '(?<protocol>\\S*)\t',
    '(?<recived_bytes>\\S*)\t',
    '(?<time_taken>\\S*)\t',
    '(?<forwared_for>\\S*)\t',
    '(?<ssl_protocol>\\S*)\t',
    '(?<ssl_cipher>\\S*)\t',
    '(?<edge_response_result_type>\\S*)\t',
    '(?<HTTP_version>\\S*)',
    '.*$'
].join('')

module.exports=require('./regex.js')(regex)
