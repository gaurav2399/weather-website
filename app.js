const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./src/utils/geocode')
const forecast = require('./src/utils/forecast')

const app = express()
const port = process.env.PORT || 3000

console.log(__dirname)
console.log(__filename)

const mainPath = path.join(__dirname,'public')

const viewPath = path.join(__dirname,'/public/templates/views')
const partialPath = path.join(__dirname,'/public/templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(mainPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Welocome to my page',
        name: 'Gaurav Sharma'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'Welocme to about page',
        name: 'Gaurav Sharma'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help Page',
        help: 'How we can help you?',
        name: 'Gaurav Sharma'
    })
})

app.get('/weather',(req,res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'Required address is missing'
        })
    }
    geocode(address,(error,{lattitude,longitude,location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(lattitude,longitude,(error,{rainProb,summary,temperature} = {}) => {
            if(error)
                return res.send({
                    error
                })
            res.send({
                forecast: summary + '.Temperature is ' + temperature + ', and chance of rain is ' + rainProb*100 + '%',
                location
            })
        })
    })
    
})

app.get('/product',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide query'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('error',{
        title: 'My 404 Page',
        msg: 'Help article not found',
        name: 'Gaurav sharma'
    })
})

app.get('*',(req,res) => {
    res.render('error',{
        msg: 'Page not found',
        title: 'My 404 Page',
        name: 'Gaurav Sharma'
    })
})

app.listen(port,() => {
    console.log('server is running on ' + port + 'port')
})