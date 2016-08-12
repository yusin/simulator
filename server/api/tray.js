module.exports = function (app, state) {
    app.post('/api/dsr/cmd/opentray', (req, res) => {

        console.log('open tray');
        state.state = 'Active';
        setTimeout(() => {
            state.state = 'TrayOpen';
            console.log('tray is opened');
        }, 5000);
        var reponse = {
            Message: "",
            Name: "Accepted"
        };
        res.send(reponse);
    });

    app.post('/api/dsr/cmd/closetray', (req, res) => {

        console.log('Close tray');
        state.state = 'Active';
        setTimeout(() => {
            state.state = 'SelfTesting';
            console.log('SelfTesting');
            setTimeout(() => {
                state.state = 'BarcodeReading';
                console.log('BarcodeReading');
                setTimeout(() => {
                    state.state = 'Inactive';
                    console.log('Inactive');
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

        console.log('Start tests');
        state.state = 'Active';
        setTimeout(() => {
            state.state = 'Inactive';
            console.log('Inactive');
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