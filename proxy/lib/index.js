/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var AWS = require('aws-sdk');
var express = require('express');
var bodyParser = require('body-parser');
var stream = require('stream');
var basicAuth = require('./auth');
var compress = require('compression');
var morgan=require('morgan')
var proxy=require('./proxy')
var server=require('./server')
var util=require('./util')

module.exports=function(config){
    
    var app = express();
    app.use(compress());
    app.use(morgan(':method :url :status :req[Authorization]'))
    app.use(util.unless('/health',basicAuth(config)));
    app.get('/health',(req,res)=>res.send("healthy\n"))
    app.use(bodyParser.raw({limit: '50mb', type: function() { return true; }}));
    return proxy(config)
        .then(func=>app.use(func))
        .then(()=>server(app))
}

