#! /usr/bin/env node
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/


module.exports=function(index,type,address){
    var con=(require('./con.js'))(address)
    
    return con.tap(function(es){
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
    })
    .tap(function(es){
        return es.indices.existsType({
            index:index,
            type:type
        })
        .tap(exists=>console.log('type '+type+' exists:'+type))
        .tap(function(exists){ 
            var body={}
            if(!exists){
                body[type]=require('./mappings')[type]
                console.log(JSON.stringify(body,null,2))
                return es.indices.putMapping({
                    index:index,
                    type:type,
                    body:body
                })
            }
        })
        .tap(()=>console.log('type created'))
        .tapCatch(()=>console.log('type failed'))
    })
}













