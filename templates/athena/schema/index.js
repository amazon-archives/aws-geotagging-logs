/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var _=require('lodash')
var render=require('./render')
module.exports=require('require-dir-all')(__dirname,{
    includeFiles:/^_.*\.(js)$/,
    map:x=>x.name=x.name.slice(1)
})

_.forOwn(module.exports,function(value,key,obj){
    var out=render(value).replace(/\n/g,'').replace(/\s+/g,' ')
    obj[key]=out
})
