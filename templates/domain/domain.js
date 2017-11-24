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
    "Domain":{
        "Type" : "AWS::Elasticsearch::Domain",
        "Properties" : {
            "ElasticsearchClusterConfig":{
                "DedicatedMasterEnabled" : true,
                "DedicatedMasterCount":2,
                "DedicatedMasterType":"m4.large.elasticsearch",
                "InstanceCount" : 4,
                "InstanceType" : "m4.large.elasticsearch",
                "ZoneAwarenessEnabled" : true
            },
            "EBSOptions":{
                "EBSEnabled" : true,
                "VolumeSize" : 10,
                "VolumeType" : "gp2"
            },
            "ElasticsearchVersion":"5.1",
            "AdvancedOptions":{
                "rest.action.multi.allow_explicit_index":true
            }
        }
    },
    "Policy": {
      "Type": "AWS::IAM::ManagedPolicy",
      "Properties": {
        "PolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Action": [
                "es:*"
              ],
              "Resource": [
                {"Fn::Join": ["/",[
                    {"Fn::GetAtt":["Domain","DomainArn"]},"*"
                ]]},
                {"Fn::GetAtt":["Domain","DomainArn"]}
              ]
            }
          ]
        }
      }
    }
}
