const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const app = express();

const port = process.env.PORT || 3000

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

//Define path for express config
const publicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

//setup handle bar engine and view location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to server
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather!',
        name: 'Mohit Upadhyay'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Welcome About Page!',
        name: 'Mohit Upadhyay'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Welcome Help page!',
        name: 'Mohit Upadhyay'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'ERROR: Must Provide Address!.'
        })
    }

    geocode(req.query.address, (error, obj = {}) => {
        if (error) {
            return res.send({error});
        }
        forcast(obj.Latitude, obj.Logitude, (error, data = {}) => { 
            if (error) {
                return res.send({error});
            }
            let forcast = '[' + data.weather_descriptions[0] + ']' + '. It is currently ' + data.temperature + '°C degrees out. This feelslike ' + data.feelslike + '°C.';
            res.send({forcast,location:obj.Address,address:req.query.address,data})
        })
    })
});

app.get('/product', (req, res) => {
    if (!req.query.serch) {
        return res.send({
            error: 'provide serch term'
        })
    }
    res.send({
        product: ''
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
    })
})

app.listen(port, () => {
    console.log("server is running a "+port+" port.");
});