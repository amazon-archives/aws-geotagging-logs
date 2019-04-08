/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var regex=[
    '^',
    '(?<version>\\S*) ',
    '(?<account_id>\\S*) ',
    '(?<interface_id>\\S*) ',
    '(?<src_ip>\\S*) ',
    '(?<dst_ip>\\S*) ',
    '(?<src_port>\\S*) ',
    '(?<dst_port>\\S*) ',
    '(?<protocol>\\S*) ',
    '(?<packets>\\S*) ',
    '(?<bytes>\\S*) ',
    '(?<start>\\S*) ',
    '(?<end>\\S*) ',
    '(?<action>\\S*) ',
    '(?<log_status>\\S*).*',
    '$'
].join('')

module.exports=require('./regex.js')(regex)
