/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

var Promise=require('../util/promise')
var path=require('path')
var isPrivate=require('private-ip')
var memoize=require('memoizee')
var Maxmind = Promise.promisifyAll(require('maxmind'))
var maxmind=Promise.join(
                Maxmind.openAsync(path.join(__dirname,'GeoLite2-City.mmdb')),
                Maxmind.openAsync(path.join(__dirname,'GeoLite2-Country.mmdb')),
                Maxmind.openAsync(path.join(__dirname,'GeoLite2-ASN.mmdb'))
            )
var geoRaw=function(ip){
    return maxmind.spread(function(city,country){
        var city_data=city.get(ip);
        var country_data=country.get(ip);
        var ASN_data=country.get(ip);
        var out={}

        if(!city_data)return null
        if(city_data.continent){
            out.continent_code=city_data.continent.code
        }
        if(city_data.country){
            out.country_code2=city_data.country.iso_code 
            out.country_name=city_data.country.names.en 
        }
        if(city_data.location){
            out.location={
                lon:city_data.location.longitude,
                lat:city_data.location.latitude
            }
            out.dma_code=city_data.location.metro_code
            out.timezone=city_data.location.time_zone
        }
        if(city_data.subdivisions && city_data.subdivisions.length>0){
            out.region_name=city_data.subdivisions[0].iso_code
            out.real_region_name=city_data.subdivisions[0].names.en
        }
        if(city_data.city){
            out.city_name=city_data.city.names.en
        }
        if(city_data.postal){
            out.postal_code=city_data.postal.code
        }
        Object.keys(out).forEach((key) => (!out[key]) && delete out[key]);
        return out
    })
}

var geo=memoize(geoRaw,{max:1000})

module.exports=function(input,src,dst){
    var ip=input[src]
    if(Maxmind.validate(ip) & !isPrivate(ip)){
        return geo(ip).then(result=>result ? input[dst]=result : {})
    }else{
        delete input[src]
        return Promise.resolve({})
    }
}





