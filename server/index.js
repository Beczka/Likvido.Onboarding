const express = require('express');
const axios = require('axios');
var cors = require('cors')

const app = express();
const port = 3001;
app.use(cors())

app.get('/', (request, response) => {
    axios.get(`http://kredit.likvido.dk/api/companytypeahead?query=${request.headers.value ? request.headers.value : 'youf'}`, {headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
    },})
        .then((res) => {
            response.json(res.data)
        })
        .catch(function (error) {
        });
});

app.get('/company', (request, response) => {
    axios.get(`http://api.likvido.dk/api/company?query=${request.headers.value}`, {headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
    },})
        .then((res) => {
            response.json(res.data)
        })
        .catch(function (error) {
        });
});


app.listen(port, (err) => {

})