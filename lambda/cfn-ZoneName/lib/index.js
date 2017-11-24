/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var Promise=require('bluebird')
var aws=require('./aws')
var route53=new aws.Route53()

module.exports=class base {
    Create(params,reply){
        route53.getHostedZone({
            Id:params.HostedZoneId
        }).promise()
        .get("HostedZone")
        .get("Name")
        .then(name=>reply(null,name,{name}))
        .catch(reply)
    }

    Update(ID,params,oldparams,reply){
        this.Create(params,reply)
    }
    
    Delete(ID,params,reply){
        reply(null)
    }
}

