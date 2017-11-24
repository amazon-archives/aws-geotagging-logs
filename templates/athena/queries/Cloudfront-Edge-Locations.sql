SELECT 
    count(edge_location_id) as count,
    edge_location_id 
FROM ${database}."cloudfront" 
group by edge_location_id
order by count desc;
