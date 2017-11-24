/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
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
