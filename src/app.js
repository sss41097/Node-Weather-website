const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const public_dir = path.join(__dirname, '../public')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handler bar engine and views location
app.set('views', path.join(__dirname, '../templates/views'));
app.set('view engine','hbs')
hbs.registerPartials(partialPath)

app.get('',(req, res)=>{
    res.render('index.hbs', {
        title:'weather app',
        name:'shashank'
    })
})
//static directory location 
app.use(express.static(public_dir))

app.get('/about', (req, res)=>{
   res.render('about.hbs',{
       title:'About'
   })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error:'Please enter address'
        })
    }
    const address = req.query.address
    geocode(address,(error, {latitude, longitude, location}={})=>{

 

        if(error){
           return res.send({
              error
           });
        }
    
        forecast(latitude, longitude, (error, daily_info)=>{
            
            if(error){
                res.send({error})
            }
    
          return  res.send({
                forecast:address,
                location:location,
                city:daily_info
            })
        
        })
    
    })



})


 app.get('/products', (req,res)=>{
    
    if(!req.query.search){
            return res.send({
                error:'You must provide a search term.'
            })
    }
    
    console.log(req.query) 
     res.send({
         products:[],
     })
 })


app.get('/about/*',(req,res)=>{
    res.render('404page.hbs',{
        error:"About Page not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404page.hbs',{
        error:"Page not found"
    })
})


app.listen(3000, ()=>{
    console.log('Server up on port 3000.')
})