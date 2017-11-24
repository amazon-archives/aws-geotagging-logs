/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var path=require('path')
var Promise=require('bluebird')
var aws=require('./util/aws')
aws.config.setPromisesDependency(Promise)
aws.config.region=process.env.REGION || 'us-west-2'
process.env.AWS_REGION=aws.config.region
var cf=new aws.CloudFormation()

var address=cf.listExports().promise()
.get("Exports")
.then(function(exports){
    var out={}
    exports.forEach(el=>out[el.Name]=el.Value)
    return out["VMWARE-DEV-ES-ADDRESS"]
})
.tap(console.log)
var index="test-index"
var type="cloudtrail"

module.exports={
    create:function(test){
        address.then(function(address){
            return require('./create.js')(index,type,"search-vmware-domain-13iza35p8vicl-iseflscfeggiphju6a3fvety6a.us-west-2.es.amazonaws.com") 
        })
        .then(()=>console.log('done'))
        .then(test.done)
    },
    delete:function(test){
        address.then(function(address){
            return require('./delete.js')(index,type,address) 
        })
        .then(()=>console.log('done'))
        .then(test.done)
    }
}
