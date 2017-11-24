SELECT
    dst_port,
    count(dst_port) as count
FROM ${database}."elb"
group by dst_port
order by count desc;
