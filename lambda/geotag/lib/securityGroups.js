/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var aws=require('./util/aws')
var ec2=new aws.EC2()
var memoize=require('promise-memoize')

module.exports=function(data){
    return cachedEni2SG()
    .then(function(eniData){
        if(data.interface_id && eniData[data.interface_id]){
            data.securityGroups=eniData[data.interface_id]
        }else{
            data.securityGroups=[]
        }
    })
}

var Eni2SG=function(){
    return ec2.describeNetworkInterfaces().promise()
    .get("NetworkInterfaces")
    .then(function(interfaces){
        var out={}
        interfaces.forEach(x=>out[x.NetworkInterfaceId]=x.Groups.map(y=>y.GroupId))
        return out
    })
}

var cachedEni2SG=memoize(Eni2SG,{ maxAge: 60000 })
