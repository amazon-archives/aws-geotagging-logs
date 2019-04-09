/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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
