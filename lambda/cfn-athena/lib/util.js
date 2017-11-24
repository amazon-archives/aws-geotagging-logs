/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var cfnLambda=require('cfn-lambda')
var aws=require('./aws')
var athena=new aws.Athena()
var Promise=require('bluebird')
var fs=Promise.promisifyAll(require('fs'))
var handlebars=require('handlebars')



handlebars.registerHelper('parse_type',function parse(item) {
    var type=item.type
    var out
    console.log(item)    
    if(type.type && type.type==="array"){
        out="array<"+item.type.items.toUpperCase()+">"
    }else{
        out=type[1].toUpperCase()
        if(out==="LONG") out="BIGINT"
    }
    return "`"+item.name+"`"+" "+out;
}

);

handlebars.registerHelper('stringify', function(context) {
  return JSON.stringify(context);
});

handlebars.registerPartial('struct',
    `struct<
    {{#each this}}
        {{this.name}}:{{#unless this.fields}}{{toUpperCase this.type}}{{#unless @last}},{{/unless}}{{/unless}}{{#if this.fields}}{{> struct this.fields}}{{/if}}{{/each}}>`
);

exports.template=function(name){
    return fs.readFileAsync(__dirname+'/templates/'+name+'.hb','utf8')
    .then(function(temp){
        return handlebars.compile(temp)
    })
}

exports.wait=function(Id){
    return new Promise(function(res,rej){
        function next(count){
            console.log('tries left:'+count)
            if(count>0){
                athena.getQueryExecution({
                    QueryExecutionId:Id.QueryExecutionId
                }).promise()
                .then(function(result){
                    var state=result.QueryExecution.Status.State
                    console.log("State:"+state)
                    if(state==='SUCCEEDED'){
                        res("done")
                    }else if(state==='FAILED' || state==='CANCELLED'){
                        console.log("Reason:"+result.QueryExecution.Status.StateChangeReason)
                        rej('query failed:'+result.QueryExecution.Status.StateChangeReason)
                    }else {
                        setTimeout(()=>next(--count),1000)
                    }
                })
                .catch(rej)
            }else{
                rej("timed out")
            }
        }
        next(60)
    })
}

exports.run=function(template,params,reply){
    template.then(function(temp){   
        console.log("name",params.Name)
        if(params.Name){
            params.Name=params.Name.replace(new RegExp('-','g'),'_')
        }
        var query=temp(params)
        console.log('Query',query)
        console.log('s3://'+params.MetaDataBucket+'/create/')
        return athena.startQueryExecution({
            QueryString:query.trim(),
            ResultConfiguration:{
                OutputLocation:'s3://'+params.MetaDataBucket+'/create/'
            }
        }).promise()
    })
    .then(exports.wait)
    .then(()=>reply(null,params.Name,{Name:params.Name}))
    .catch(error=>reply(error))
}
