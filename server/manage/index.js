module.exports = function (app, state) {

    app.get('/manage/', (req, res) => {
        console.log(req.param.instance,state[req.param.instance])
        res.send(state[req.param.instance]);
    });

    app.post('/manage/', (req, res) => {
        console.log(req.body);
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