select 
    count(awsregion) as count,
    awsregion 
from ${database}."cloudtrail"
   group by awsregion order by count desc;
