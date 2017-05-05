const express = require('express');
const http = require('http');
const parseString = require('xml2js').parseString;
const app = express();

app.get('/', (request, response) => {
    http.get('http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml', (res) => {
        const {statusCode} = res;
        const contentType = res.headers['content-type'];

        let error;
        if (statusCode !== 200) {
            error = new Error(`Request Failed.\n` +
                `Status Code: ${statusCode}`);
        } else if (!/^text\/xml/.test(contentType)) {
            error = new Error(`Invalid content-type.\n` +
                `Expected application/json but received ${contentType}`);
        }
        if (error) {
            console.error(error.message);
            // consume response data to free up memory
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                // let parsedData = {};
                parseString(rawData, (err, result) => {
                    // parsedData = JSON.parse(result);
                    const R = result['gesmes:Envelope'].Cube[0].Cube;
                    R.forEach((i)=>{
                       console.log(i.Cube);
                    });
                    response.send(R);
                });
                // const parsedData = JSON.parse(rawData);
                // console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});