/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var address="search-vmware-domain-qra5krt1ek97-36yada5rnfz2j2wzeg23rmxwmq.us-west-2.es.amazonaws.com"
process.env.AWS_REGION='us-west-2'
var con=require('../lib/con')(address)

con.then(function(es){
    es.indices.getMapping({
        index:".kibana"
    })

    es.search({
        index:".kibana",
        body:{
            "query" : {
                "match_all" : {}
            }
        }
    }).tap(x=>console.log(JSON.stringify(x,null,2)))
})
