
const request = require('request');

const geocode = (address, callBack) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibW9oaXR1cGEiLCJhIjoiY2w5ZjlsM3N1MDRmeDNvazJpOXJxNGFsNSJ9.cpSGz90nRY52NGci0e-MIw&limit=1";

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callBack('Unable connect...', 'ERROR!');
        } else {
            if (body.message) {
                callBack(res.body.message, 'ERROR!');
            } else if(body.features.length > 0) {
                let lat = body.features[0].center[0];
                let log = body.features[0].center[1];
                let address = body.features[0].place_name;
                callBack(err, {
                    Latitude: lat,
                    Logitude: log,
                    Address: address
                })
            } else {
                callBack('ERROR! Location not Found, Provide Better Address.', 'ERROR!');            
            }
        }
    })
}

module.exports = geocode;