SELECT 
    eventsource as service ,
    count(eventsource) as count
FROM ${database}."cloudtrail" 
group by eventsource
order by count desc;
