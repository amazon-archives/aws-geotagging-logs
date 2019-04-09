/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var Promise=require('bluebird')
var https = require('https');
var http = require('http');
var fs=require('fs')
var pem=require('pem')

var BIND_ADDRESS ='0.0.0.0' || '127.0.0.1';
var PORT = 8000;

module.exports=function(app){
    return Promise.promisifyAll(pem).createCertificateAsync({days:30, selfSigned:true})
    .then(function(keys){
        var server=https.createServer({
            key: keys.serviceKey, 
            cert: keys.certificate
        },app)

        var redirect=http.createServer(function (req, res) {
            var host=req.headers['host'].split(':')[0]
            res.writeHead(301, { 
                "Location": "https://" + host+':'+PORT + req.url 
            });
            res.end();
        })
        return {
            start:function(){
                server.listen(PORT);
                redirect.listen(PORT+1);
                console.log('Listening at https://' + BIND_ADDRESS + ':' + PORT);
                console.log('Listening at http://' + BIND_ADDRESS + ':' + (PORT+1));
            },
            stop:function(){
                server.close()
                redirect.close()
            }
        }
    })
}

