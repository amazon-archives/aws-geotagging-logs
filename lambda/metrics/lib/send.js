/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var aws=require('./aws')
var cw=new aws.CloudWatch()

module.exports=function(data,name){
    return data.map(function(record){
        return putMemory(record.used/record.size,record.billed-record.duration,name)
    })
}

function putMemory(ratio,dif,name){
    return cw.putMetricData({MetricData: [{
          MetricName: 'lambda-used-memory', 
          Dimensions: [
            {
              Name: "function", 
              Value: name
            }
          ],
          StorageResolution: 1,
          Timestamp: new Date() ,
          Value: ratio,
          Unit:"Percent"
        },
        {
          MetricName: 'time-remainder', 
          Dimensions: [
            {
              Name: "function", 
              Value: name
            }
          ],
          StorageResolution: 1,
          Timestamp: new Date() ,
          Value: dif,
          Unit:"Milliseconds"
        }
      ],
      Namespace: 'geotag' 
    }).promise().tap(console.log)
}


