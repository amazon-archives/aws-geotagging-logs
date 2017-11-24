/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

module.exports=function(name,parameters,depends=null,bucket={"Ref":"BootstrapBucket"}){
    var out={
        "Type" : "AWS::CloudFormation::Stack",
        "Properties" : {
            "TemplateURL" : {"Fn::Join":["/",[
                "https://s3.amazonaws.com",
                bucket,
                "templates/"+name+'.json'
            ]]},
            "Parameters":Object.assign({
                "BootstrapBucket":bucket
            },parameters)
        }
    }
    if(depends){
        out.DependsOn=depends
    }
    return out
}
