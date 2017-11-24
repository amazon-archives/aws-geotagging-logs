/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var lambda=require('../bin/lambda.js')
var path=require('path')

var run=function(params,test){
    return lambda(params)
        .tap(msg=>console.log("response",JSON.stringify(msg,null,1)))
        .tap(test.ok)
        .catch(test.ifError)
        .finally(test.done)
}

module.exports={
    flowlogs:function(test){
        run(require('./flowlogs'),test)
    },
    cloudtrail:function(test){
        var params=require('./s3')
        //params.Records[0].s3.bucket.name="jcalho-cloudtrail"
        //params.Records[0].s3.object.key="AWSLogs/613341023709/CloudTrail/us-east-1/2017/04/02/613341023709_CloudTrail_us-east-1_20170402T0000Z_JextKpl551t6SaY6.json.gz"
        params.Records[0].s3.bucket.name="vmware-master-52-master-urvgapwjadvm-inges-bucket-vvsubwy01qo5"
        params.Records[0].s3.object.key="AWSLogs/613341023709/CloudTrail-Digest/eu-central-1/2017/08/23/613341023709_CloudTrail-Digest_eu-central-1_VMWARE-master-52-Master-URVGAPWJADVM-ingest-1WP3CV8AO8XM8-Data-W0CN2OOGENWF-Trail-116E7X9QG1ZAH_us-west-2_20170823T003106Z.json.gz"

        run(params,test)
    },
    elb:function(test){
        var params=require('./s3')
        params.Records[0].s3.bucket.name="geotag-elb-11-databucket-1fhr3fl4ligwf"
        params.Records[0].s3.object.key="AWSLogs/613341023709/elasticloadbalancing/us-west-2/2017/10/29/613341023709_elasticloadbalancing_us-west-2_GEOTAG-elb-11-ELB-1LYJFYWP7ECLZ_20171029T1800Z_35.162.58.7_49tsqfgn.log"
        run(params,test)
    },
    alb:function(test){
        var params=require('./s3')
        params.Records[0].s3.bucket.name="access-logs-examples"
        params.Records[0].s3.object.key="elasticloadbalancing.log.gz"
        run(params,test)
    },
    cloudfront:function(test){
        var params=require('./s3')
        params.Records[0].s3.bucket.name="access-logs-examples"
        params.Records[0].s3.object.key="E31W80Y5851ILE.2017-08-23-01.6b371069.gz"
        run(params,test)
    }
}


