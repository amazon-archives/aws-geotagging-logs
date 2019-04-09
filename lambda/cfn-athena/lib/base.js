/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var Promise=require('bluebird')
var util=require('./util.js')

module.exports=class base {
    Create(params,reply){
        util.run(this.create_template,params,reply)
    }

    Update(ID,params,oldparams,reply){
        var self=this
        if(params.name===oldparams.name){
            self.Create(params,reply)
        }else{
            Promise.promisify(self.Delete)(ID,oldparams)
            .then(function(){
                self.Create(params,reply)
            })
        }
    }
    
    Delete(ID,params,reply){
        util.run(this.delete_template,params,reply)
    }
}

