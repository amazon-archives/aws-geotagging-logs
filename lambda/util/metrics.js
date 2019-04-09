/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var aws=require('./aws')
var cw=new aws.CloudWatch()
var recycled=false

exports.recycle=function(){
    var out=cw.putMetricData({MetricData: [{
          MetricName: 'lambda-recycle', 
          Dimensions: [
            {
              Name: "function", 
              Value: process.env.AWS_LAMBDA_FUNCTION_NAME
            }
          ],
          StorageResolution: 1,
          Timestamp: new Date() ,
          Value: recycled ? 1 : 0,
          Unit:"Count"
      }],
      Namespace: 'geotag' 
    }).promise()
    recycled=true
    return out
}

exports.compression=function(ratio,stage){
    console.log(ratio)
    return cw.putMetricData({MetricData: [{
          MetricName: 'compression', 
          Dimensions: [
            {
              Name: "function", 
              Value: process.env.AWS_LAMBDA_FUNCTION_NAME
            }
          ],
          StorageResolution: 1,
          Timestamp: new Date() ,
          Value: ratio,
          Unit:"Percent"
        }
      ],
      Namespace: 'geotag' 
    }).promise()
}
