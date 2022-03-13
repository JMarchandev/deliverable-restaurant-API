require('dotenv').config()

import express from 'express';
const bodyParser = require('body-parser');
const cors = require('cors');
const { contentType } = require('express/lib/response');

const {URL, PORT, API_V} = process.env

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get(`/${API_V}`, (req, res) => {
    res.json({status: 'alive'})
})

const uberRouter = require('./routes/uber-eats-delivery')
app.use('/uber', uberRouter)

app.listen(PORT, () => {
 console.log(`server listen ${PORT}`);
});
