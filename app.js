"use strict";

const log = require('./log');
const express = require('express');
const app = express();
const req_log = require('./middleware/req-logger');

const PORT = process.env.PORT || 3000;

app.use(req_log);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('/public/index.html');
});

app.listen(PORT, () => log.info('Server listening on port ' + PORT));
