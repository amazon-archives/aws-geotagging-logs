#! /usr/bin/env node
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var fs = require('fs');
var express = require('express');
var https = require('https');
var key = fs.readFileSync(__dirname+'/key.pem');
var cert = fs.readFileSync(__dirname+'/cert.pem')
var https_options = {
    key: key,
    cert: cert
};
var PORT = 8000;
var HOST = 'localhost';
app = express();
var morgan=require('morgan')
app.use(morgan(':method :url :status'))

app.put('/test', function (req, res) {
    res.send(true)
})

module.exports=function(){
    server = https.createServer(https_options, app).listen(PORT, HOST);
    console.log('HTTPS Server listening on %s:%s', HOST, PORT);
    return server
}



