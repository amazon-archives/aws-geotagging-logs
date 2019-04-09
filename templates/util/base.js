/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

module.exports=function(description,parameters,outputs){
  var out={"AWSTemplateFormatVersion": "2010-09-09",
      "Description": description || "",
      "Outputs": {},
      "Parameters": {}
    }

    for(param in parameters){
        out.Parameters[param]={
            "Type":parameters[param]
        }
    }
    for(output in outputs){
        out.Outputs[output]={
            "Value":outputs[output]
        }
    }
    return out
}
