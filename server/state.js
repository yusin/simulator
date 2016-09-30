export default class State {
  constructor() {
    // this.instance = instance;
    this.enabled = true;
    this.state = 'Inactive';
    this.model = {
      Firmware: 'Release 1.2.3.4,March 14 1995',
      Model: 'Simulated System'
    };
    this.slides = [
      { slideId: '1', stationId: '0' },
      { slideId: '2', stationId: '1' },
      { slideId: '3', stationId: '2' },
      { slideId: '4', stationId: '3' },
    ];
  }
}