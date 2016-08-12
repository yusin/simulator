import express from 'express';
import bodyParser from 'body-parser';

const app = express.Router();


let state = {
  enabled: true,
  state: 'Inactive',
  model: {
    Firmware: 'Release 1.2.3.4,March 14 1995',
    Model: 'Simulated System'
  },
  slides: [
    { slideId: '1', stationId: '' },
    { slideId: '2', stationId: '' },
    { slideId: '3', stationId: '' },
    { slideId: '4', stationId: '' },
  ]

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
