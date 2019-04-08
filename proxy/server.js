#!/usr/bin/env node
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

module.exports=function(config){
    var app=require('./lib')(config)
    return app
}

if(require.main === module ){
    var config=require(process.argv[2] || './test.json')
    var app=module.exports(config)    
    app.then(server=>server.start())
}
