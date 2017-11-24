/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var Promise=require('./lib/util/promise')
var parse=require('./lib/parse')
var transform=require('./lib/process')
var hose=require('./lib/hose')
var metrics=require('./lib/util/metrics')

exports.handler=function(event,context,cb){
    process.env.TYPE=null
    Promise.join( 
        parse(event).map(transform).then(hose),
        metrics.recycle()
    )
    .finish(cb,event)
}
