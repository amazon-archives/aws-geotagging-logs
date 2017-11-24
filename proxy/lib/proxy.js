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
var httpProxy = require('http-proxy');
var stream = require('stream');

var credentails
var chain = new AWS.CredentialProviderChain();
var ready=new Promise(function(res,rej){
    chain.resolve(function (err, resolved) {
        if (err){
            rej(err)
        }else{
            credentials = resolved
            setInterval(function(){
                console.log("refreshing credentials")
                credentials.refreshPromise().tap(()=>console.log("refreshed"))
            },1000*60)
            res()
        };
    });
})

module.exports=function(config){
    var ENDPOINT = config.address;
    var REGION = ENDPOINT.match(/\.([^.]+)\.es\.amazonaws\.com\.?$/)[1];
    var TARGET = ENDPOINT;
    if (!TARGET.match(/^https?:\/\//)) {
        TARGET = 'https://' + TARGET;
    }
   
    var proxy = httpProxy.createProxyServer({
        target: TARGET,
        changeOrigin: true,
        secure: true
    });

    proxy.on('proxyReq', function (proxyReq, req) {
        
        var endpoint = new AWS.Endpoint(ENDPOINT);
        var request = new AWS.HttpRequest(endpoint);
        request.method = proxyReq.method;
        request.path = proxyReq.path;
        request.region = REGION;
        if (Buffer.isBuffer(req.body)) request.body = req.body;
        if (!request.headers) request.headers = {};
        request.headers['presigned-expires'] = false;
        request.headers['Host'] = ENDPOINT;

        var signer = new AWS.Signers.V4(request, 'es');
        signer.addAuthorization(credentials, new Date());

        proxyReq.setHeader('Host', request.headers['Host']);
        proxyReq.setHeader('X-Amz-Date', request.headers['X-Amz-Date']);
        proxyReq.setHeader('Authorization', request.headers['Authorization']);
        if (request.headers['x-amz-security-token']) proxyReq.setHeader('x-amz-security-token', request.headers['x-amz-security-token']);
    });

    proxy.on('proxyRes', function (proxyReq, req, res) {
        if (req.url.match(/\.(css|js|img|font)/)) {
            res.setHeader('Cache-Control', 'public, max-age=86400');
        }
    });

    
    var out=function (req, res) {
        var bufferStream;
        if (Buffer.isBuffer(req.body)) {
            var bufferStream = new stream.PassThrough();
            bufferStream.end(req.body);
        }
        proxy.web(req, res, {buffer: bufferStream});
    }
    return ready.then(()=>out)
}
    
    
