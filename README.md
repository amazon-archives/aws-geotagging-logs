# GeoTaging Log Files in AWS

> Enrich log files with geo-location information and analyze using AWS Athena and/or ElasticSearch

## Overview
This repo provides a CloudFormation template to enrich AWS log files with geo-location information. VPC Flowlogs, ELB access logs, CloudFront access logs, and CloudTrail logs are streamed through lambda and saved in an S3 Bucket. The Enriched logs are then sent to ElasticSearch or Athena for analysis. To securely access the Kibana dashboard a Cognito login page is provided.

## Prerequisites
- Run Linux. (tested on Amazon Linux)
- Install npm >3 and node >6. ([instructions](https://nodejs.org/en/download/))
- Clone this repo.
- Set up an AWS account. ([instructions](https://AWS.amazon.com/free/?sc_channel=PS&sc_campaign=acquisition_US&sc_publisher=google&sc_medium=cloud_computing_b&sc_content=AWS_account_bmm_control_q32016&sc_detail=%2BAWS%20%2Baccount&sc_category=cloud_computing&sc_segment=102882724242&sc_matchtype=b&sc_country=US&s_kwcid=AL!4422!3!102882724242!b!!g!!%2BAWS%20%2Baccount&ef_id=WS3s1AAAAJur-Oj2:20170825145941:s))
- Configure AWS CLI and local credentials. ([instructions](http://docs.AWS.amazon.com/cli/latest/userguide/cli-chap-welcome.html))  
- Copy /config.example.json to /config.json and set the aws-region and aws credential profile used to deploy CloudFormation templates. Also for testing and automated deployments set the AWS Certificate ARN and Route53 ZoneId.

## Getting Started
First, install all prerequisites:
```shell
npm install 
```

Next, use the following command to launch a CloudFormation template to create the S3 bucket to be used for Lambda code and CloudFormation templates. Wait for this template to complete (you can watch progress from the [AWS CloudFormation console](https://console.AWS.amazon.com/cloudformation/home))  
```shell
npm run stack dev/bootstrap up
```

After the template has launched, use the following command to build all assets and upload to the S3 bucket created in the previous step:
```shell
npm run upload
```

Finally, run the following command to get the url to launch your template.
```shell
npm run url
```

## Components
### CloudFormation Templates
The templates are found in the /templates directory. To build all templates run:
```shell
npm run cfn
```
The built templates will be in the /build/templates directory. 

### Lambda Functions
Lambda functions are found in the /lambda directory. To build all lambdas run:
```shell
npm run lambda
```
the built lambda zip files will be in the /build/lambdas

### Proxy Server
The code for the ElasticSearch Proxy server is in the /proxy directory. It will be deployed to EC2 instances using CodeDeploy.

## Running Tests
The following will launch a CloudFormation template to create AWS resources in your account that are used in the Lambda and CloudFormation tests. 
```shell
npm run stack dev up
```

Once the template has completed you can run the tests in the following sections.

### CloudFormation tests
The CloudFormation test templates are in the templates/test folder. Run a template test with:
```shell
npm run stack test/{template-name}
```

For example, if you want to launch a template with filename "es.json" run the following command:
```shell
npm run check test/es
```

You also can check a template's syntax with:
```shell
npm run check {template-name}
```

### Running Lambda Function tests
Each lambda directory has its own tests that can be run by executing the following command in that directory:
```shell
npm run test
```
Some tests may require additional configuration to run properly.

## License

This sample code is made available under the MIT-0 license. See the LICENSE file.
