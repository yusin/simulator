module.exports = function (app, state) {

  app.get('/api/dsr/info', (req, res) => {
    var reponse = {
      Firmware: state.model.Firmware,
      Model: state.model.Model
    };
    res.send(reponse);
  });

  app.get('/api/dsr/', (req, res) => {
    var reponse = {
      BarcodeReadResult: {
        Errors: null,
        Slides: state.slides
      },
      DsrId: 'Noname',
      SelfCheckResult: {
        Errors: [],
        LastSelfTest: new Date(),
        LastSelfTestSuccess: null
      },
      State: state.state
    };
    if (state.enabled) {
      res.send(reponse);
    } else {
      res.status(404)        // HTTP status 404: NotFound
        .send('Not found');
    }

  });
};
