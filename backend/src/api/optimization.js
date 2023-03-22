import dotenv from 'dotenv-defaults';

export default ( request_body ) => {
    dotenv.config();
    if (!process.env.OPENROUTE_TOKEN) {
        console.error("Missing OPENROUTE_TOKEN!!!");
        process.exit(1);
    }

    var request = require('request');
    console.log("Optimization API Running!");

    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            url: 'https://api.openrouteservice.org/optimization',
            body: request_body,
            headers: {
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
                'Authorization': process.env.OPENROUTE_TOKEN,
                'Content-Type': 'application/json; charset=utf-8'
            }}, (error, response, body) => {
                console.log('Status:', response.statusCode);
                // console.log('Headers:', JSON.stringify(response.headers));
                // console.log('Response:', body);
                return resolve(body)
            }
        );
    });
}