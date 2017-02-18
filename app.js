"use strict";

const express = require('express');
const app = express();
const req_log = require('./middleware/req-logger');

app.use(req_log);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('/public/index.html');
});

app.listen(3000);
