module.exports = function (app, state) {

    app.get('/manage/', (req, res) => {
        res.send(state);
    });

    app.post('/manage/', (req, res) => {
        console.log(req.body);
        state.enabled = req.body.enabled;
        state.state = req.body.state;
        state.model = req.body.model;
        res.send(state);
    });

};