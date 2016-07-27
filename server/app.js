import express from 'express';
import bodyParser from 'body-parser';

const app = express.Router();


let state = {
  enabled: true,
  state: 'Inactive',
  model: {
    Firmware: 'lkjhlk',
    Model: 'Simulated'
  },
  slides:[]

};
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({
  extended: true
}));
require('./api/dsr')(app, state);
require('./api/tray')(app, state);
require('./manage')(app, state);




module.exports = app;