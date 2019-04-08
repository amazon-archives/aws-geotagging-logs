#! /usr/bin/env node
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
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
