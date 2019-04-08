/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

module.exports={
    'FlowlogsHose':hose("flowlogs"),
    "ESKinesisLogsflowlogs":log('flowlogs'),
    'CloudtrailHose':hose("cloudtrail"),
    "ESKinesisLogscloudtrail":log('cloudtrail'),
    'CloudfrontHose':hose("cloudfront"),
    "ESKinesisLogscloudfront":log('cloudfront'),
    'ElbHose':hose("elb"),
    "ESKinesisLogselb":log('elb')
}
function hose(Prefix){
    return {Type : "AWS::KinesisFirehose::DeliveryStream",
    Properties : {
        ElasticsearchDestinationConfiguration:{
        BufferingHints : {
            IntervalInSeconds : 300,
            SizeInMBs : 100
        },
        CloudWatchLoggingOptions :{
            Enabled : true,
            LogGroupName : {"Ref":"LogGroup"},
            LogStreamName : {"Ref":"ESKinesisLogs"+Prefix}
        },
        DomainARN : {"Ref":"DomainArn"},
        IndexName : "geotag-"+Prefix,
        TypeName : Prefix,
        IndexRotationPeriod : "NoRotation",
        RetryOptions :{
            DurationInSeconds : 300
        },
        RoleARN : {"Fn::GetAtt":["KinesisRole","Arn"]},
        S3BackupMode : "FailedDocumentsOnly",
        S3Configuration : {
            BucketARN : require('../../util/arn').bucket("DataBucket"),
            BufferingHints : {
                IntervalInSeconds : 300,
                SizeInMBs : 5
            },
            CloudWatchLoggingOptions :{
                Enabled : true,
                LogGroupName : {"Ref":"LogGroup"},
                LogStreamName : {"Ref":"ESKinesisLogs"+Prefix}
            },
            CompressionFormat : "GZIP",
            Prefix : "failed/"+Prefix,
            RoleARN : {"Fn::GetAtt":["KinesisRole","Arn"]}
        }
    }
    }
    }
}

function log(name){
    return {
        "Type" : "AWS::Logs::LogStream",
        "Properties" : {
            "LogGroupName" : {"Ref":"LogGroup"},
            "LogStreamName": ["ESKinesisLogs-",name].join('-')
        }
    }
}
