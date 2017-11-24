SELECT 
    src_ip ,
    sum(bytes) as bytes
FROM ${database}."flowlogs" 
group by src_ip
order by bytes desc;
