#! /usr/bin/env node
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var config=require('../config')
process.env.AWS_PROFILE=config.profile

var chalk=require('chalk')
var argv=require('optimist').argv
var configfile='./config.json'
var config_parent=require(configfile)

var config=config_parent.code
config.region=config_parent.region
config.ProjectName=config_parent.ProjectName

var codedeploy=new require('codedeploy')(config)

var command=argv._[0]
switch(command){
    case "upload":
        var work=codedeploy.upload()
        break;
    case "deploy":
        var cloudformation=new (require('cloudformation'))(config_parent)
        var work=cloudformation.getOutput(config_parent)
            .then(function(){
                config.app=config_parent.outputs.app
                config.group=config_parent.outputs.group
            })
        work=work.then(codedeploy.deploy)
        break;
}

work.error(function(err){
    console.log(chalk.red(err))
})
