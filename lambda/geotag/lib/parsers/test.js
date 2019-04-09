/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var txt='2017-08-20T02:26:45.799032Z VMWARE-master-ELB-1IOCG0CVBT3MQ 152.156.222.154:36058 10.0.3.216:8001 0.000049 0.001307 0.00002 301 301 0 0 "GET http://www.elespectador.com:80/noticias/medio-ambiente/el-eclipse-del-siglo-podra-apreciarse-en-colombia-el-proximo-lunes-21-de-agosto-video-708882 HTTP/1.1" "Mozilla/5.0 (Linux; Android 5.1.1; SM-J111M Build/LMY47V; wv) AppleWebKit/537.36 (KHTML,  like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/130.0.0.45.70  ;]" - -'

require('./elb')(txt)
