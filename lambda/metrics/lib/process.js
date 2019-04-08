/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var regex=require('xregexp')
var reg=regex('.*Duration: (?<duration>.*) ms Billed Duration: (?<billed>.*) ms Memory Size: (?<size>.*) MB Max Memory Used: (?<used>.*) MB')

module.exports=function(x){
    var tmp=regex.exec(x.replace(/\s+/g,' '),reg)
    if(tmp){
        return {
            duration:tmp.duration,
            billed:tmp.billed,
            size:tmp.size,
            used:tmp.used
        }
    }else{
        return null
    }
}

