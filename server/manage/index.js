import log4js from 'log4js';
const logger = log4js.getLogger();

module.exports = function (app, state) {

    app.get('/manage/', (req, res) => {
        
        // debug(req.param.instance,state[req.param.instance])
        res.send(state[req.param.instance]);
    });

    app.post('/manage/', (req, res) => {
        logger.info('Changing state for', req.param.instance, ' with ', req.body)
        // debug(req.body);
        state[req.param.instance].enabled = req.body.enabled;
        state[req.param.instance].state = req.body.state;
        state[req.param.instance].model = req.body.model;
        state[req.param.instance].slides = req.body.slides
        res.send(state);
    });

    app.get('/all/', (req, res) => {
        
        res.send(state);
    });

};