/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

const zlib = require('zlib');
const Promise=require('bluebird')

module.exports=function(event){
    var zippedData = Buffer.from(event.awslogs.data, 'base64');
    return gunzipPromise(zippedData)
    .then(data=>JSON.parse(data.toString('utf8')))
}

const gunzipPromise = (buffer) => {
  return new Promise( (resolve, reject) => {
    zlib.gunzip(buffer, (error, result) => error ? reject(error) : resolve(result));
  })
}
