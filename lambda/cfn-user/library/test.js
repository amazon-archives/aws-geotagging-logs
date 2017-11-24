/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

process.env.REGION='us-east-1'
var Lib=require('./index.js')
var Promise=require('bluebird')

var lib=Promise.promisifyAll(new Lib())
module.exports={
    create:function(test){
        lib.CreateAsync({
            password:"asfdadfsAS3SD@#",
            username:"admin"
        })
        .then(()=>test.done())
    },
    rm:function(test){
        lib.DeleteAsync("admin",{
            password:"asfdadfsAS3SD@#",
            username:"admin" 
        })
        .then(test.done)
    }
}
