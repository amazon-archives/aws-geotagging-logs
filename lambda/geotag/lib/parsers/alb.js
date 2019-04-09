/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var regex=[
    '^',
    '(?<protocolDouble>\\S*) ',
    '(?<timestamp>\\S*) ',
    '(?<elb>\\S*) ',
    '(?<src_ip>\\S*):',
    '(?<src_port>\\S*) ',
    '(?<dst_ip>\\S*):',
    '(?<dst_port>\\S*) ',
    '(?<request_process_time>\\S*) ',
    '(?<backend_process_time>\\S*) ',
    '(?<response_process_time>\\S*) ',
    '(?<status_code>\\S*) ',
    '(?<backend_status_code>\\S*) ',
    '(?<recived_bytes>\\S*) ',
    '(?<sent_bytes>\\S*) ',
    '"(?<request>\\S*) ',
        '(?<protocol>\\S*)://',
        '(?<Host>\\S*):',
        '(?<Port>\\d*)/',
        '(?<uri>\\S*) ',
        '(?<HTTP_verion>\\S*)" ',
    '"(?<user_agent>.*)" ',
    '(?<ssl_cipher>\\S*) ',
    '(?<ssl_protocol>\\S*)',
    '.*$'
].join('')

module.exports=require('./regex.js')(regex)
