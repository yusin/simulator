import log4js from 'log4js';
const logger = log4js.getLogger(); 
module.exports = function (app, state) {
  app.post('/api/dsr/cmd/opentray', (req, res) => {

    logger.debug('open tray');
    state[req.param.instance].state = 'Active';
    setTimeout(() => {
      state[req.param.instance].state = 'TrayOpen';
      logger.debug('tray is opened');
    }, 5000);
    var reponse = {
      Message: '',
      Name: 'Accepted'
    };
    res.send(reponse);
  });

  app.post('/api/dsr/cmd/closetray', (req, res) => {

    logger.debug('Close tray');
    state[req.param.instance].state = 'Active';
    setTimeout(() => {
      state[req.param.instance].state = 'SelfTesting';
      logger.debug('SelfTesting');
      setTimeout(() => {
        state[req.param.instance].state = 'BarcodeReading';
        logger.debug('BarcodeReading');
        setTimeout(() => {
          state[req.param.instance].state = 'Inactive';
          logger.debug('Inactive');
        }, 3000);
      }, 3000);
    }, 5000);
    var reponse = {
      Message: '',
      Name: 'Accepted'
    };
    res.send(reponse);
  });

  app.post('/api/dsr/cmd/starttests', (req, res) => {

    logger.debug('Start tests');
    state[req.param.instance].state = 'Active';
    setTimeout(() => {
      state[req.param.instance].state = 'Inactive';
      logger.debug('Inactive');
    }, 10000);
    var reponse = {
      "Failures": null,
      "JobsList": [],
      "cmdResponse": {
        "Message": "",
        "Name": "Accepted"
      }
    };
    res.send(reponse);
  });

};