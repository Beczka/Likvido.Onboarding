const express = require('express');
const axios = require('axios');
var cors = require('cors');
var bodyParser = require('body-parser');

const app = express();

const port = process.env.port || 3000;

app.use(cors());

app.use(bodyParser.json());

app.get('/companytype', (request, response) => {
    axios.get(`http://testkredit.likvido.dk/api/v1/Company/typeahead?query=${request.headers.value ? request.headers.value : 'youf'}`, {
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
    axios.get(`http://testkredit.likvido.dk/api/v1/Company/${request.headers.value}`, {
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
    axios.post(`https://testcore.likvido.dk/api/Creditors`, request.body.data, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json-patch+json',
        },
    })
        .then((res) => {
            response.json(res.data)
        })
        .catch((error)=> {
            response.json(error.response.data)
            console.log('error',error.response.data)
        });

});

app.listen(port, (err) => {
    console.log('test server')
})