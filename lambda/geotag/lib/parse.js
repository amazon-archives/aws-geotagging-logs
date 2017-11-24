/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

const zlib = require('zlib');
var aws=require('./util/aws')
var s3=new aws.S3()
var Promise=require('./util/promise')

var found=false
module.exports=function(event){
    found=false
    return Promise.resolve(event)
    .if(event.awslogs,flowlogs)
    .if(!event.awslogs,
        function(){ 
            var Key=event.Records[0].s3.object.key
            console.log(Key)
            return s3.getObject({
                Bucket:event.Records[0].s3.bucket.name,
                Key
            }).promise()
            .if(Key.match(/.*\/CloudTrail\//),cloudtrail)
            .if(Key.match(/.*elasticloadbalancing.*\.log$/),elb)
            .if(Key.match(/.*elasticloadbalancing.*\.log.gz$/),alb)
            .if(Key.match(/.*\.....-..-..-..\..*.gz$/),cloudfront)
            .if(Key.match(/.*CloudTrail-Digest.*/),()=>{
                found=true
                process.env.TYPE="NONE"
                return []
            })
        }
    )
    .if(()=>!found,()=>Promise.reject("Invalide Log Format"))
}
var flowlogs=function(event){
    process.env.TYPE='flowlogs'
    found=true
    return unzip(event.awslogs.data)
    .then(JSON.parse)
    .then(data=>data.messageType==='DATA_MESSAGE' ? data.logEvents : [])
    .map(data=>require('./parsers/vpc')(data.message))
    
}

var cloudtrail=function(file){ 
    found=true
    process.env.TYPE='cloudtrail'
    return unzip(file.Body)
    .then(data=>JSON.parse(data))
    .log()
    .then(data=>data.digestStartTime ? {Records:[]} : data)
    .get('Records')
}

var alb=function(file){
    found=true
    process.env.TYPE='elb'
    return unzip(file.Body)
    .then(x=>x.split('\n').filter(x=>x.length>0))
    .map(require('./parsers/alb'))
    .tap(console.log)
    .map(function(data){
        for(x in data){
            if(data[x]==='-' || data[x].length===0) delete data[x]
        }
        return data
    })
}

var elb=function(file){
    found=true
    process.env.TYPE='elb'
    return file.Body.toString()
        .split('\n').filter(x=>x.length>0)
        .map(require('./parsers/elb'))
        .map(function(data){
            for(x in data){
                if(data[x]==='-' || data[x].length===0) delete data[x]
            }
            return data
        })
}

var cloudfront=function(file){
    found=true
    process.env.TYPE='cloudfront'
    return unzip(file.Body)
    .then(x=>x.split('\n').filter(y=>y[0]!=='#' && y.length>0))
    .map(require('./parsers/cloudfront'))
    .map(function(data){
        for(x in data){
            if(data[x]==='-') delete data[x]
        }
        return data
    })
}

var unzip=function(input){
    var zippedData = Buffer.from(input, 'base64');
    return gunzipPromise(zippedData)
    .then(data=>data.toString('utf8'))
}

const gunzipPromise = (buffer) => {
  return new Promise( (resolve, reject) => {
    zlib.gunzip(buffer, (error, result) => error ? reject(error) : resolve(result));
  })
}
