/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var widget=require('./widget')

module.exports=[
    widget([
        [ "AWS/ELB", "HealthyHostCount", "LoadBalancerName", "VMWARE-master-ELB-LWM1KUBZ3OE8", { "stat": "Sum" } ],
        [ ".", "RequestCount", ".", ".", { "stat": "Sum", "yAxis": "right" } ],
        [ ".", "Latency", ".", ".", { "stat": "Sum" } ]
    ],{
        "x": 12,
        "y": 6,
        "width": 6,
        "height": 6
    }),
    widget([
        [ "AWS/EC2", "CPUUtilization", "AutoScalingGroupName", "VMWARE-master-57-Master-1U7E6WIIFWOHB-Proxy-1N1VEHRT29MK2-ScalingGroup-16P0YGXGHRYYA" ],
        [ ".", "CPUCreditBalance", ".", ".", { "yAxis": "right" } ]
    ],{
        "x": 18,
        "y": 6,
        "width": 6,
        "height": 6
    })
]
