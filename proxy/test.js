/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var config=require('./test.json')
config.region=require('../config').region
var https=require('https')
var axios=require('axios').create({
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
    })
})
var Promise=require('bluebird')
var aws=require('aws-sdk')
aws.config.setPromisesDependency(Promise)
aws.config.region=require('../config').region
var cf=new aws.CloudFormation()
process.env.region=require('../config').region
var username
var password

module.exports={
    setUp:function(callback){
        var self=this
        var exports={}
        cf.listExports().promise()
        .get('Exports')
        .each(exp=>exports[exp.Name]=exp.Value)
        .then(function(){
            config.address=exports["VMWARE-DEV-ES-ADDRESS"]
            config.poolId=exports["VMWARE-COGNITO-POOL-ID"]
            config.client=exports["VMWARE-COGNITO-CLIENT"]
            config.userPool=exports["VMWARE-COGNITO-USER-POOL"]
            
            username=exports["VMWARE-DEV-USER"]
            password=exports["VMWARE-DEV-PASSWORD"]
            return require('./server.js')(config)
        })
        .then(function(server){
            self.server=server
            self.server.start()
        })
        .then(callback)
    },
    redirect:function(test){
        test.expect(1)
        Promise.resolve(axios.get('http://localhost:8001/health'))
        .get('data')
        .then(function(response){
            test.ok(response)
        })
        .finally(test.done)
    },
    health:function(test){
        test.expect(1)
        Promise.resolve(axios.get('https://localhost:8000/health'))
        .get('data')
        .then(function(response){
            test.ok(response)
        })
        .finally(test.done)
    },
    root:function(test){
        test.expect(1)
        Promise.resolve(axios({
            url:'https://localhost:8000/',
            method:'get',
            auth:{
                username,
                password
            }
        }))
        .get('data')
        .then(function(response){
            test.ok(response)
        })
        .finally(test.done)
    },
    fail:function(test){
        axios({
            url:'https://localhost:8000/',
            method:'get'
        }).catch(test.done)
    },
    tearDown:function(callback){
        this.server.stop()
        callback()
    }
}

