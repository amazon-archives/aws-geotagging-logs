/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

module.exports={
    'FlowlogsHose':hose("flowlogs/"),
    'CloudtrailHose':hose("cloudtrail/"),
    'CloudfrontHose':hose("cloudfront/"),
    'ELBHose':hose("elb/"),
}

function hose(Prefix){
    return {Type : "AWS::KinesisFirehose::DeliveryStream",
    Properties : {
        S3DestinationConfiguration:{
            BufferingHints : {
                IntervalInSeconds : 300,
                SizeInMBs : 5
            },
            CloudWatchLoggingOptions :{
                Enabled : true,
                LogGroupName : {Ref:"LogGroup"},
                LogStreamName : {Ref:"KinesisLogs"}
            },
            RoleARN : {"Fn::GetAtt":["KinesisRole","Arn"]},
            BucketARN:require('../../util/arn').bucket("DataBucket"),
            CompressionFormat:"GZIP",
            Prefix
        }
    }
    }
}

