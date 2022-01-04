const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//define parths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Saurav Rawat"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sachin Rawat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help me",
        name: "Mayank joshi"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter a valid address!'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecastData,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast:'it is snowing',
    //     location: 'Auli',
    //     address: req.query.address
    // })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must Provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('Error', {
        title: "Error message",
        name: "Help Article not found"
    })
})

app.get('*', (req, res) => {
    res.render('Error', {
        title: "Error message",
        name: 'Page not found'
    })
})

// app.get('' , (req , res)=>{
//     res.send('Hello express !')
// })
// app.get('/help' , (req , res)=>{
//     res.send('Help page !')
// })
// app.get('/about' , (req , res)=>{
//     res.send({
//         name:'Saurav Rawat',
//         age: 21
//     })
// })
app.get('/weather', (req, res) => {
    res.send({ location: 'Nainital', forecast: 'Its 3 degree outside' })
})




app.listen(port, () => {
    console.log('Server is on port' + port)
})