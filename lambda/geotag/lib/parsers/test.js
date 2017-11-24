/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var txt='2017-08-20T02:26:45.799032Z VMWARE-master-ELB-1IOCG0CVBT3MQ 152.156.222.154:36058 10.0.3.216:8001 0.000049 0.001307 0.00002 301 301 0 0 "GET http://www.elespectador.com:80/noticias/medio-ambiente/el-eclipse-del-siglo-podra-apreciarse-en-colombia-el-proximo-lunes-21-de-agosto-video-708882 HTTP/1.1" "Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V; wv) AppleWebKit/537.36 (KHTML,  like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/130.0.0.45.70  ;]" - -'

require('./elb')(txt)
