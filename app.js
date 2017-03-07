"use strict";

const log = require('./log');
log.trace('Entered app.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const req_log = require('./middleware/req-logger');
const repl = require('./lib/repl');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded( {extended: true} ));
app.use(req_log);
app.use(express.static('public'));

// Homepage
app.get('/', (req, res) => {
    res.sendFile('/public/index.html');
});

// Post to this route to run code against the repl.it api
app.post('/code', (req, res) => {
  const code = req.body.code;
  let output = "";

  repl.evaluate(code, {
    stdout: str => {
      output += str.replace('\n', '<br>');
      log.debug(JSON.stringify(str));
    }

  }).then(
    // Evaluation succeeded without a connection error
    result => {
      res.send({
        output: result.error ? result.error : output,
        error: Boolean(result.error),
        data: result.data
      });
    },

    // There was a connection error
    error => {
      log.error('REPL connection error: ' + error.message);
      res.status(500).end();
    }
  );
})

app.listen(PORT, () => log.info('Server listening on port ' + PORT));
