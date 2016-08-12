import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import 'whatwg-fetch';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';

import Well from './well';

import { Grid, Row, Cell } from 'react-inline-grid';

const App = connect(state => ({ count: state }))(React.createClass({
  propTypes: {
    count: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      dsr: {
        model: {},
        slides: [
          { slideId:'1', stationId: '0' },
          { slideId:'2', stationId: '1' },
          { slideId:'3', stationId: '2' },
          { slideId:'4', stationId: '3' },
        ]
      }, actual: {}
    };
  },
  componentDidMount() {

    fetch('/manage/')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ dsr: responseJson });
      })
      .catch((error) => {
        console.error(error);
      });

    setInterval(() => {
      fetch('/manage/')
        .then((response) => response.json())
        .then((responseJson) => {

          this.setState({ actual: responseJson });
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);

  },
  enable(val, v) {
    console.log('enable', this.state.dsr);
    fetch('/manage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.dsr)
    });
  },
  openTray() {
    fetch('/api/dsr/cmd/opentray', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
  },
  closeTray() {
    fetch('/api/dsr/cmd/closetray', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
  },

  handleChangeState(v, val, x) {
    let dsr = this.state.dsr;
    dsr.state = x;
    this.setState({ dsr: dsr });
  },
  handleChangeModel(v, val) {
    let dsr = this.state.dsr;
    dsr.model.Model = val;
    this.setState({ dsr: dsr });
  },
  handleChangeFirmware(v, val) {
    let dsr = this.state.dsr;
    dsr.model.Firmware = val;
    this.setState({ dsr: dsr });
  },
  changeWell(id, value) {
    let dsr = this.state.dsr;
    dsr.slides[parseInt(id)-1+''] = {slideId: value, stationId: id-1};
    this.setState({ dsr: dsr });
  },
  handleChangeEnabled(v, val) {
    console.log(val);
    let dsr = this.state.dsr;
    dsr.enabled = val;
    this.setState({ dsr: dsr });
  },
  render() {

    const txtStyle = {
      marginLeft: '15px'
    };

    return (
      <div>
        <AppBar
          title="OpGen/EPAM Imager Simulator"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        <Grid>
          <Row is="center">
            <Cell is="8"><div><Paper  style={{ padding: '15px' }}>

              <Toggle
                // label="Enabled"
                toggled = {this.state.dsr.enabled}
                onToggle={this.handleChangeEnabled}
                />
              <Row is="center">
                <Cell is="middle 3">
                  <label>State</label>
                </Cell>
                <Cell is="6">
                  <SelectField value={this.state.dsr.state} onChange={this.handleChangeState}>
                    <MenuItem value="Active" primaryText="Active" />
                    <MenuItem value="Inactive" primaryText="Inactive" />
                    <MenuItem value="TrayOpen" primaryText="TrayOpen" />
                    <MenuItem value="Failure" primaryText="Failure" />
                    <MenuItem value="BarcodeReading" primaryText="BarcodeReading" />
                    <MenuItem value="SelfTesting" primaryText="SelfTesting" />
                  </SelectField>
                </Cell>
                <Cell is="middle 3">
                  <Chip>
                    {this.state.actual.state}
                  </Chip>
                </Cell>
              </Row>

              <Row is="center">
                <Cell is="middle 3">
                  <label>Model</label>
                </Cell>
                <Cell is="9">
                  <TextField
                    id="text-field-controlled"
                    value={this.state.dsr.model.Model}
                    onChange={this.handleChangeModel}
                    />
                </Cell>
              </Row>
              <Row is="center">
                <Cell is="middle 3">
                  <label>Firmware</label>
                </Cell>
                <Cell is="9">
                  <TextField
                    id="text-field-controlled"
                    value={this.state.dsr.model.Firmware}
                    onChange={this.handleChangeFirmware}
                    />
                </Cell>
              </Row>
              <Row is="end">
                <Cell is="12">
                  <RaisedButton label="Update" secondary={true} onClick={this.enable} style={txtStyle}/>
                </Cell>
              </Row>
              <Row is="center">
                <Cell is="3">
                  <Well id={1} well={this.state.dsr.slides[0].slideId} onChange={this.changeWell} />
                </Cell>
                <Cell is="3">
                  <Well id={2}  well={this.state.dsr.slides[1].slideId}  onChange={this.changeWell} />
                </Cell>
                <Cell is="3">
                  <Well id={3} well={this.state.dsr.slides[2].slideId} onChange={this.changeWell}  />
                </Cell>
                <Cell is="3">
                  <Well id={4} well={this.state.dsr.slides[3].slideId} onChange={this.changeWell}  />
                </Cell>
              </Row>
              <Row is="end">
                <Cell is="12">
                  <RaisedButton label="Open" primary={true} onClick={this.openTray} style={txtStyle} />
                  <RaisedButton label="Close" primary={true} onClick={this.closeTray} style={txtStyle} />
                </Cell>
              </Row>
            </Paper></div></Cell>

          </Row>

        </Grid>

      </div>
    );
  },
}));

export default App;
