/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
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

