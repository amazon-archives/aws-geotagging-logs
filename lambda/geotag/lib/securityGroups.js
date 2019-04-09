/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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
