/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var fs=require('fs')
var query=function(name){
    return {
        "Type": "Custom::AthenaQuery",
        "DependsOn":"Policy",
        "Properties": {
            "ServiceToken":{"Fn::GetAtt":["Lambda","Arn"]},
            "Name":name.split('.')[0],
            "Database":{"Fn::GetAtt":["Database","Name"]},
            "QueryString":{"Fn::Sub":[
                fs.readFileSync(__dirname+'/'+name,'utf8'),
                {database:{"Fn::GetAtt":["Database","Name"]}}
            ]}
        }
    }
}
var out={}
fs.readdirSync(__dirname)
    .filter(x=>x.match(/.*\.sql/))
    .forEach(function(file){
        name=file.split('.')[0]
        out[name.replace(/-/g,'')]=query(file)
    })

module.exports=out
