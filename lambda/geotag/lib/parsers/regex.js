/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var XRegExp=require('xregexp')

module.exports=function(regex){
    var reg=XRegExp(regex)
    var names=reg.xregexp.captureNames.filter(x=>x)
    
    var parse=function (string) {
        var out={} 
        var matches=XRegExp.exec(string,reg)
        names.forEach(name=>(out[name]=matches[name])) 
        return out
    }

    return function(string){
        return parse(string.toString('utf-8'))
    }
}

