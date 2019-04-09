#! /usr/bin/env node
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/


module.exports=function(index,type,address){
    var con=(require('./con.js'))(address)
    return con.tap(function(es){
        return es.indices.exists({
            index:index
        })
        .tap(console.log)
        .tap(function(exists){ 
            return exists ? es.indices.delete({
                index:index
            }) : null
        })
        .tap(console.log)
    })
}
