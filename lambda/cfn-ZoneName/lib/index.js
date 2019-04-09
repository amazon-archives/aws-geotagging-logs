/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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

