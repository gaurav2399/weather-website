const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ2F1cmF2MjMxOTk5IiwiYSI6ImNrNWg2bGUxdDAwbGozbG1tZmN2N2NpYWkifQ.iyrOI4MfsBy8_VOG2w6DWw&limit=1'
    request({url,json:true},(error,{body}) => {
        if(error){
            callback("Unable to connect to location services")
        }else if(body.features.length === 0){
            callback("Unable to get info of location")
        }else if(body.error){
            callback("Unable to get location")
        }else{
            callback(undefined,{
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode