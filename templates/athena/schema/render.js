/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
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




