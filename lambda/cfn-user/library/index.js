/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var Promise=require('bluebird')
var aws=require('aws-sdk')
aws.config.setPromisesDependency(Promise)
var cfnLambda=require('cfn-lambda')
aws.config.region=process.env.AWS_REGION
var cognito=new aws.CognitoIdentityServiceProvider()

module.exports=class {
    Create(params,reply){
        cognito.adminCreateUser({
            UserPoolId:process.env.USERPOOL,
            Username:params.username,
            TemporaryPassword:params.password+'1'
        }).promise()
        .then(function(){
            return cognito.adminInitiateAuth({
                AuthFlow: 'ADMIN_NO_SRP_AUTH', 
                ClientId: process.env.CLIENT,
                UserPoolId:process.env.USERPOOL,
                AuthParameters: {
                    USERNAME: params.username,
                    PASSWORD: params.password+'1',
                }
            }).promise()
        })
        .then(function(session){
            return cognito.adminRespondToAuthChallenge({
                ClientId: process.env.CLIENT,
                UserPoolId:process.env.USERPOOL,
                ChallengeName:"NEW_PASSWORD_REQUIRED",
                ChallengeResponses:{
                    USERNAME: params.username,
                    NEW_PASSWORD:params.password
                },
                Session:session.Session
            }).promise()
        })
        .then(()=>reply(null,params.username))
        .catch(err=>reply(err))
    }

    Update(ID,params,oldparams,reply){
        reply(null)
    }
    
    Delete(ID,params,reply){
        cognito.adminDeleteUser({
            UserPoolId:process.env.USERPOOL,
            Username:params.username
        }).promise()
        .then(()=>reply(null))
        .catch(err=>reply(err))
    }
 }

