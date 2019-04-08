/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var Promise=require('bluebird')
var fs=Promise.promisifyAll(require('fs'))
var handlebars=require('handlebars')
var _=require('lodash')
handlebars.registerHelper('parse_type',function parse(key,item,sep=" ") {
    var type=item.type
    var out

    if(type==="array"){
        out="array<"+item.items.type+">"
    }else if(type==='object'){
        var tmp=_.map(item.properties,function(value,name){
            return parse(name,value,":")
        })
        out="struct<"+tmp+">"
    }else{
        out=type
    }
    return "`"+key+"`"+sep+out;
}

);

handlebars.registerPartial('struct',
    `struct<
    {{#each this}}
        {{this.name}}:{{#unless this.fields}}{{toUpperCase this.type}}{{#unless @last}},{{/unless}}{{/unless}}{{#if this.fields}}{{> struct this.fields}}{{/if}}{{/each}}>`
);

module.exports=function(data){
    var temp=fs.readFileSync(__dirname+'/template.hb','utf8')
    return handlebars.compile(temp)(data)
}




