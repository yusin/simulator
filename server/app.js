import express from 'express';
import bodyParser from 'body-parser'
import State from './state'

import log4js from 'log4js';
const logger = log4js.getLogger();
// import Map from 'es6-map';

const app = express.Router();

let defaultState = new State();
// let state = new Map();
// state.set('_initial', initialState);
let states = {
  default: defaultState
};
app.use(function (req, res, next) {
  req.headers['if-none-match'] = 'no-match-for-this';
  next();
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({
  extended: true
}));

app.use(function (req, res, next) {
  // if (req.url.slice(-1) === '/') {
  //   req.url = req.url.slice(0, -1);
  // }




  const request = req.url.split('/');
  let instance = 'default';
  if (request[2] === 'api' || request[2] === 'manage') {
    instance = request[1];
    if (!states[instance]) {
      states[instance] = new State(instance);
      logger.debug('creating new instance ' + instance);
    } else {
      logger.debug('getting existance instance ' ,instance , states[instance].state)
    }


    request.splice(0, 2);
    req.url = '/' + request.join('/');

  }
  req.param.instance = instance;
  next();
});


require('./api/dsr')(app, states);
require('./api/tray')(app, states);
require('./api/job')(app, states);
require('./manage')(app, states);




module.exports = app;
