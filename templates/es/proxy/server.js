/*license
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

module.exports={
"LaunchConfig":instance("AWS::AutoScaling::LaunchConfiguration"),
"ScalingGroup":{
    "Type" : "AWS::AutoScaling::AutoScalingGroup",
    "Properties" : {
        "HealthCheckType" : "ELB",
        "LaunchConfigurationName" : {"Ref":"LaunchConfig"},
        "HealthCheckGracePeriod":"300",
        "LoadBalancerNames" :[{"Ref":"ELB"}],
        "DesiredCapacity" : 3,
        "MaxSize" : 5,
        "MinSize" : 2,
        "VPCZoneIdentifier" : [{"Ref":"subnet1"},{"Ref":"subnet2"}]
    }
},
"ELB":{
    "Type": "AWS::ElasticLoadBalancing::LoadBalancer",
    "Properties": {
        "HealthCheck" : {
            "HealthyThreshold" : "2",
            "Interval" : "30",
            "Target" : "HTTPS:8000/health",
            "Timeout" : "10",
            "UnhealthyThreshold" : "10"
        },
        "Listeners" : [{
            "InstancePort" : "8000",
            "InstanceProtocol" : "HTTPS",
            "LoadBalancerPort" : "443",
            "Protocol" : "HTTPS",
            "SSLCertificateId":{"Ref":"Cert"}
        },
        {
            "InstancePort" : "8001",
            "InstanceProtocol" : "HTTP",
            "LoadBalancerPort" : "80",
            "Protocol" : "HTTP"
        }],
        "SecurityGroups" : [{"Ref":"ELBSG"}],
        "Subnets" : [{"Ref":"subnet1"},{"Ref":"subnet2"}]
    }
}}


function instance(type){
    return {
   "Type" : type,
   "Metadata":{
        "AWS::CloudFormation::Init":{"config":{
            "services": {
                "sysvint": {
                    "codedeploy-agent": {
                        "enabled": "true",
                        "ensureRunning": "true"
                    }
                }
            },
            "files":{   
                "/etc/proxy.json":{
                    "content":{"Fn::Join":["",[
                        "{",
                            "\"port\":\"","8000","\",\n",
                            "\"region\":\"",{"Ref":"AWS::Region"},"\",\n",
                            "\"address\":\"",{"Ref":"ESAddress"},"\",\n",
                            "\"poolId\":\"",{"Ref":"IdPool"},"\",\n",
                            "\"client\":\"",{"Ref":"Client"},"\",\n",
                            "\"userPool\":\"",{"Ref":"UserPool"},"\"\n",
                        "}"
                    ]]},
                    "mode": "000400",
                    "owner": "root",
                    "group": "root"
                },
                "/etc/awslogs/config/server.conf": {
                    "content": {"Fn::Join": ["\n",[
                        "[/var/log/server/server.log]",
                        "file = /var/log/server/server.log",
                        {"Fn::Join": ["",[
                            "log_group_name = ",{"Ref":"Logs"}
                        ]]},
                        "log_stream_name = {instance_id}/server.log"
                    ]]},
                    "mode": "000400",
                    "owner": "root",
                    "group": "root"
                },
                "/etc/awslogs/config/userdata.conf": {
                    "content": {"Fn::Join": ["\n",[
                        "[/var/log/cloud-init-output.log]",
                        "file = /var/log/cloud-init-output.log",
                        {"Fn::Join": ["",[
                            "log_group_name = ",{"Ref":"Logs"}
                        ]]},
                        "log_stream_name ={instance_id}/cloud-init-output.log"
                    ]]},
                    "mode": "000400",
                    "owner": "root",
                    "group": "root"
                },
                "/etc/awslogs/config/codedeploy.conf": {
                    "content": {"Fn::Join": ["\n",[
                        "[/var/log/codedeploy.log]",
                        "file = /var/log/aws/codedeploy-agent/codedeploy-agent.log",
                        {"Fn::Join": ["",[
                            "log_group_name = ",{"Ref":"Logs"}
                        ]]},
                        "log_stream_name = {instance_id}/codedeploy.log",
                        "datetime_format = %Y-%m-%d %H:%M:%S"
                    ]]},
                    "mode": "000400",
                    "owner": "root",
                    "group": "root"
                },
                "/etc/awslogs/config/codedeploy-updater.conf": {
                    "content": {"Fn::Join": ["\n",[
                        "[/var/log/codedeploy-updater.log]",
                        "file = /tmp/codedeploy-agent.update.log",
                        {"Fn::Join": ["",[
                            "log_group_name = ",{"Ref":"Logs"}
                        ]]},
                        "log_stream_name = {instance_id}/codedeploy-updater.log"
                    ]]},
                    "mode": "000400",
                    "owner": "root",
                    "group": "root"
                },
                "/etc/awslogs/config/codedeploy-deployment.conf": {
                    "content": {"Fn::Join": ["\n",[
                        "[/var/log/codedeploy-deployment.log]",
                        "file = /opt/codedeploy-agent/deployment-root/deployment-logs/codedeploy-agent-deployments.log",
                        {"Fn::Join": ["",[
                            "log_group_name = ",{"Ref":"Logs"}
                        ]]},
                        "log_stream_name = {instance_id}/codedeploy-deployment.log"
                    ]]},
                    "mode": "000400",
                    "owner": "root",
                    "group": "root"
                },
                "/etc/awslogs/config/forever.conf": {
                    "content": {"Fn::Join": ["\n",[
                        "[/var/log/server/forever.log]",
                        "file = /var/log/server/forever.log",
                        {"Fn::Join": ["",[
                            "log_group_name = ",{"Ref":"Logs"}
                        ]]},
                        "log_stream_name = {instance_id}/forever.log"
                    ]]},
                    "mode": "000400",
                    "owner": "root",
                    "group": "root"
                },
                "/etc/awslogs/config/stdout.conf": {
                    "content": {"Fn::Join": ["\n",[
                        "[/var/log/server/stdout.log]",
                        "file = /var/log/server/stdout.log",
                        {"Fn::Join": ["",[
                            "log_group_name = ",{"Ref":"Logs"}
                        ]]},
                        "log_stream_name = {instance_id}/stdout.log"
                    ]]},
                    "mode": "000400",
                    "owner": "root",
                    "group": "root"
                },
                "/etc/awslogs/config/stderr.conf": {
                    "content": {"Fn::Join": ["\n",[
                        "[/var/log/server/stderr.log]",
                        "file = /var/log/server/stderr.log",
                        {"Fn::Join": ["",[
                            "log_group_name = ",{"Ref":"Logs"}
                        ]]},
                        "log_stream_name = {instance_id}/stderr.log"
                    ]]},
                    "mode": "000400",
                    "owner": "root",
                    "group": "root"
                }
            }
        }}
   },
   "Properties" : {
      "ImageId" : { "Fn::FindInMap" : [ "RegionMap", { "Ref" : "AWS::Region" }, "64"]},
      "InstanceType" : {"Ref":"ServerInstance"},
      "SecurityGroups" : [{"Ref":"ServerSG"}],
      "AssociatePublicIpAddress":true,
      "IamInstanceProfile" : {"Ref":"ServerProfile"},
      "UserData" :{ "Fn::Base64" : { "Fn::Join" : ["\n", [
        "#!/bin/bash -xe",
        "yum update -y",
        "yum install -y awslogs",
        { "Fn::Join" : [" ", [
            "/opt/aws/bin/cfn-init -s",
            {"Ref":"AWS::StackName"},
            "-r LaunchConfig",
            "--region",{"Ref":"AWS::Region"}
        ]]},
        "service awslogs start",
        "chkconfig awslogs on",
        "curl --silent --location https://rpm.nodesource.com/setup_7.x | bash -",
        "yum install -y nodejs",
        "cd /home/ec2-user/",
        {"Fn::Join":["",[
            "wget https://aws-codedeploy-",
            {"Ref":"AWS::Region"}, 
            ".s3.amazonaws.com/latest/install"
        ]]},
        "/bin/chmod +x install",
        "./install auto",
        "yum install perl-Switch perl-DateTime perl-Sys-Syslog perl-LWP-Protocol-https -y",
        "curl http://aws-cloudwatch.s3.amazonaws.com/downloads/CloudWatchMonitoringScripts-1.2.1.zip -O",
        "unzip CloudWatchMonitoringScripts-1.2.1.zip",
        "rm CloudWatchMonitoringScripts-1.2.1.zip",
        "cd aws-scripts-mon",
        "chmod +x ./mon-put-instance-data.pl",
        "./mon-put-instance-data.pl --mem-util --mem-used --mem-avail --verify --verbose",
        "./mon-put-instance-data.pl --mem-util --mem-used --mem-avail --verbose",
        {"Fn::Join": [" ",[
            "echo '",
            "* * * * *",
            "root",
            "/home/ec2-user/aws-scripts-mon/mon-put-instance-data.pl",
                "--mem-util",
                "--mem-used",
                "--mem-avail",
                "--from-cron",
                "--auto-scaling",
            "' >> /etc/crontab"
        ]]},
        "cat /etc/crontab"
    ]]}}
   }
}
}
