SELECT 
    count(src_geoip.country_name) as count, 
    src_geoip.country_name 
FROM ${database}."flowlogs"
group by src_geoip.country_name
order by count desc;
