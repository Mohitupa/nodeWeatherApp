const request = require('request');

const weatherData = (lat, log, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=4965c94f7ec428f216e90d18485002fb&query=" + log + "," + lat + "&units=m";

    request({ url, json: true }, (err, {body}) => {
        if (err) {
            callback('Unable connect...','ERROR!');
        } else {
            if (body.error) {
                callback(body.error.info,'ERROR!');
            } else {
                let data = body.current;
                callback(err,data);
            }
        }
    })
}

module.exports = weatherData;
