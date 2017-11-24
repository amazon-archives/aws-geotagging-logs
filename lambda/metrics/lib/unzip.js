/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
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
