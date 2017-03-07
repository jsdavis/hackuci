'use strict';

const log = require('../log');
log.trace('Entered repl.js');

const config = require('../config');
const REPLIT_TOKEN = config.repl.token;
const lang = config.repl.lang;
const url = config.repl.url;

const WebSocket = require('ws');
const ReplitClient = require('replit-client');

const repl = new ReplitClient(url, 80, lang, REPLIT_TOKEN, socketCreator);

repl.connect().then(() => {
  log.info('REPL connected');
}, (err) => {
  log.error('REPL connection failed: ', err);
});

module.exports = repl;


function socketCreator(address, protocols, options) {
  return new WebSocket(address, protocols, options);
}