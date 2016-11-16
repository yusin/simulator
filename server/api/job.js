let job = function (app, state) {
    app.get('/api/dsr/job/{id}', (req, res) => {

        console.log(req.parms.id)
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
}

module.exports = job;