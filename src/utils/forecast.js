const request = require('request')
const forecast=(latitude , longitude , callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=408607316c2db1b9406cd7e09503bbf0&query='+ longitude +','+latitude+''
    request({url, json:true} , (error , {body}) =>{
        if (error){
            callback('unable to connect to the Internet', undefined)
        }else if(body.error){
            callback('unable to find the location', undefined)
        }else{
            callback(undefined , "it is currently " + body.current.temperature + " degree out there. It feels like "  + body.current.feelslike + " degrees out.")
        }
    })
}

module.exports = forecast