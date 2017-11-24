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
