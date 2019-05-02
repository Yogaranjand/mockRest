'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 3030;
const app = express();
const routes = require('./app/routes')

app.use(cors());
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
require('./app/routes')(app);

app.listen(PORT, () => console.log(`Server Listening At Port ${PORT}`));