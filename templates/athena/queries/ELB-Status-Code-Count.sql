SELECT 
    status_code, 
    count(status_code) as count 
FROM ${database}."elb"
group by status_code
order by status_code desc;
