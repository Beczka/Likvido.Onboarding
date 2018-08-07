const express = require('express');
const axios = require('axios');
var cors = require('cors');
var bodyParser = require('body-parser');
const querystring = require('querystring');
const env = require('./config.js');

const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use('/static', express.static(__dirname + '/build/static'));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/build/index.html`)
});

app.get('/companytype', (request, response) => {
    axios.get(`${env.config.CREDIT_SITE_BASE_PATH}/api/v1/Company/typeahead?query=${request.headers.value ? request.headers.value : 'youf'}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((res) => {
            response.json(res.data)
        })
        .catch(function (error) {
        });
});

app.get('/company', (request, response) => {
    axios.get(`${env.config.CREDIT_SITE_BASE_PATH}/api/v1/Company/${request.headers.value}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((res) => {
            response.json(res.data)
        })
        .catch(function (error) {
        });
});


app.post('/creditors', (request, response) => {
   let data = {creditor: request.body.data}
   axios.post(`${env.config.CORE_SITE_BASE_PATH}/api/Creditors`, data, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json-patch+json',
        },
    })
        .then((res) => {
            response.json(res.data)
        })
        .catch(function (error) {
            response.json(error.response.data)
        });

});


app.listen(port, (err) => {
})