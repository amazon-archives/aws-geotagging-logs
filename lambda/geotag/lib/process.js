/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var Promise=require('./util/promise')
var get_geoip=require('./data')
var stringify=require("json-stringify-pretty-compact")
var securityGroups=require('./securityGroups')
var airport=require('airport-lookup')

module.exports=function(input){
    return Promise.resolve(input)
    .if(process.env.TYPE==='flowlogs',flowlogs)
    .if(process.env.TYPE==='cloudtrail',cloudtrail)
    .if(process.env.TYPE==='elb',elb)
    .if(process.env.TYPE==='cloudfront',cloudfront)
    .if(process.env.TYPE==="NONE",x=>x)
}

var elb=function(input){
    input.eventTime=(new Date(input.timestamp)).getTime()
    console.log(input)
    delete input.timestamp
    input.time_taken=[
        input.request_process_time,
        input.backend_process_time,
        input.response_process_time
    ].map(parseFloat).reduce((x,y)=>x+y)

    toFloat(input,"request_process_time")
    toFloat(input,"backend_process_time")
    toFloat(input,"response_process_time")
    toInt(input,"recived_bytes")
    toInt(input,"sent_bytes")

    return get_geoip(input,'src_ip','src_geoip')
    .return(input)
}

var cloudfront=function(input){
    input.eventTime=(new Date(input.date+'T'+input.time)).getTime()
    var location=airport(input.edge_location_id.slice(0,3))

    toInt(input,"sent_bytes")
    toInt(input,"recived_bytes")
    toFloat(input,"time_taken")
    
    if(location){
        input.edge_location={
            lat:parseFloat(location.lat),
            lon:parseFloat(location.lon)
        }
    }

    delete input.date
    delete input.time
    console.log(input)
    return get_geoip(input,'src_ip','src_geoip')
    .return(input)
}

var flowlogs=function(input){
    console.log(input)
    input.eventTime=(input.start*1000).toString()
    toInt(input,"start")
    toInt(input,"end")
    toInt(input,"bytes")
    
    return Promise.join(
        get_geoip(input,'src_ip','src_geoip'),
        get_geoip(input,'dst_ip','dst_geoip'),
        securityGroups(input)
    ).return(input)
}

var cloudtrail=function(input){
    delete input.responseElements
    delete input.requestParameters
    input.eventTime=(new Date(input.eventTime)).getTime().toString()

    rename(input,"sourceIPAddress","src_ip")
    rename(input,"userAgent","user_agent")

    if(input.src_ip!=='AWS Internal'){
        return get_geoip(input,'src_ip','src_geoip').return(input)
    }
    return input
}

var rename=function(ob,from,to){
    ob[to]=ob[from]
    delete ob[from]
}
var toFloat=function(ob,src){
    ob[src]=parseFloat(ob[src])
}
var toInt=function(ob,src){
    ob[src]=parseInt(ob[src])
}
