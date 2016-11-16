import log4js from 'log4js';
const logger = log4js.getLogger();

module.exports = function(app, state) {

  app.get('/api/dsr/info', (req, res) => {
    logger.debug('info request processing')
    var reponse = {
      Firmware: state[req.param.instance].model.Firmware,
      Model: state[req.param.instance].model.Model
    };
    if (state[req.param.instance].enabled) {
      res.send(reponse);
    } else {
      res.status(404)        // HTTP status 404: NotFound
        .send('Not found');
    }
  });

  app.get('/api/dsr/', (req, res) => {
    var reponse = {
      BarcodeReadResult: {
        Errors: null,
        Slides: state[req.param.instance].slides
      },
      DsrId: 'Noname',
      SelfCheckResult: {
        Errors: [],
        LastSelfTest: new Date(),
        LastSelfTestSuccess: null
      },
      State: state[req.param.instance].state
    };
    if (state[req.param.instance].enabled) {
      res.send(reponse);
    } else {
      res.status(404)        // HTTP status 404: NotFound
        .send('Not found');
    }

  });
};
