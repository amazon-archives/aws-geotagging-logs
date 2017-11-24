/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var regex=require('xregexp')
var reg=regex('.*Duration: (?<duration>.*) ms Billed Duration: (?<billed>.*) ms Memory Size: (?<size>.*) MB Max Memory Used: (?<used>.*) MB')

module.exports=function(x){
    var tmp=regex.exec(x.replace(/\s+/g,' '),reg)
    if(tmp){
        return {
            duration:tmp.duration,
            billed:tmp.billed,
            size:tmp.size,
            used:tmp.used
        }
    }else{
        return null
    }
}

