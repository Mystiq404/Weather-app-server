const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2F1cmF2NDA0IiwiYSI6ImNreGltemJsdTJ5NngzMG9jbnUyNTl6eW0ifQ.0QqDzC03pefXUK6HPw2T3g&limit=1'
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Internet' ,undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search' , undefined)
        } else {
            callback(undefined , {
                latitude :body.features[0].center[1],
                longitude :body.features[0].center[0],
                location: body.features[0].place_name
            })
         
        }
    })
}


module.exports= geocode