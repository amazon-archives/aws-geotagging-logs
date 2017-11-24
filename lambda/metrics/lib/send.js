/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
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


