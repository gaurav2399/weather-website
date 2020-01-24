const request = require('request')

const forecast = (lattitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/47364b770c48e3e60eb499b1219f462d/' + lattitude + ',' + longitude +'?units=si&lang=en'

    request({url,json: true},(error,{body}) => {
        if(error){
            callback("Unable to connect internet")
        }else if(body.error){
            callback("Improper URL")
        }else{
            callback(undefined,{
                rainProb: body.currently.precipProbability,
                temperature: body.currently.temperature,
                summary: body.currently.summary
            })
        }
    })
}

module.exports = forecast