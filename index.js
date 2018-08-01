const express = require('express');
const axios = require('axios');
var cors = require('cors');
var bodyParser = require('body-parser');
const querystring = require('querystring');

const app = express();
const port = 3000;
app.use(cors());
app.use('/static', express.static(__dirname + '/build/static'));

app.use(bodyParser.json());

app.get('/companytype', (req, res) => {
    res.sendFile(`${__dirname}/server/build/index.html`)
});

app.get('/', (request, response) => {
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
    axios.post(`https://testcore.likvido.dk/api/Creditors`, data, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json-patch+json',
        },
    })
        .then((res) => {
            response.json(res.data)
            console.log('asdasdasdasdadd', res)
        })
        .catch(function (error) {
            console.log('error',error)
        });

});


app.listen(port, (err) => {
    console.log('test server')
})