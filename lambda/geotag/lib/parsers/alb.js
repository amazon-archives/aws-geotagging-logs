/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
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
