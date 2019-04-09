#! /usr/bin/env node
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var aws=require('./util/aws')
var Promise=require('./util/promise')
var s3=new aws.S3()
var index=".kibana"

module.exports=function(params){
    var con=(require('./con.js'))(process.env.ADDRESS)
    var file=s3.getObject({
        Bucket:params.ExportFile.Bucket,
        Key:params.ExportFile.Key
    }).promise()
    .then(x=>JSON.parse(x.Body.toString('utf8'))).tap(()=>console.log("got file"))

    var setup=con.tap(createIndex).tap(function(es){
        return Promise.join(
            createMapping(es,"index-pattern"),        
            createMapping(es,"config"),        
            createMapping(es,"visualization"),        
            createMapping(es,"search"),
            createMapping(es,"dashboard"),
            createMapping(es,"server")
        )
    }).tap(()=>console.log("created mappings"))

    return Promise.join(setup,file)
    .tap(x=>x[0].indices.refresh())
    .spread(function(es,documents){
        return Promise.all(
            documents.concat(require('./config'))
            .map(document=>putDocument(es,document))
        )
    }).tap(()=>console.log("put files"))
}

var createIndex=function(es){
    return es.indices.exists({
        index:index
    })
    .tap(exists=>console.log('index '+index+' exists:'+exists))
    .tap(function(exists){ 
        return !exists ? es.indices.create({
            index:index
        }) : null
    })
    .tap(()=>console.log('index created'))
    .tapCatch(()=>console.log('index failed'))
}

var createMapping=function(es,type){
    return es.indices.existsType({
        index:index,
        type:type
    })
    .tap(exists=>console.log('type '+type+' exists'))
    .tap(function(exists){ 
        var body={}
        if(!exists){
            body[type]=require('./mappings')[type]
            return es.indices.putMapping({
                index:index,
                type:type,
                body:body
            })
        }
    })
    .tap(()=>console.log('type:'+type+' created'))
    .tapCatch(()=>console.log('type:'+type+' failed'))
}

var putDocument=function(es,document){
    console.log("creating "+document._id+' '+document._type)
    var param={
        index:index,
        type:document._type,
        id:document._id,
        body:document._source
    }
    return es.index(param)
        .then(()=>console.log(document._id+' '+document._type+' created'))
}







