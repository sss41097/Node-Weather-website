const request = require('request')

const forecast = (latitude, longitude, callback)=>{

    const url = 'https://api.darksky.net/forecast/f4f17451acafe7e29555d33ddf4c5c0a/' + latitude + ',' + longitude + '?units=si&lang=en'

// use {body} in place of response {also possible}
    request({ url, json:true }, (error, response)=> {
    
    if(error){
        callback('Network error')
    
    } else if(response.body.error){
        callback('Unable to find location')

    } else{
        const data = response.body
        callback(undefined, response.body.daily.data[0].summary)

    }
    })

}

module.exports = forecast