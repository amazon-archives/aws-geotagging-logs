/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
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

