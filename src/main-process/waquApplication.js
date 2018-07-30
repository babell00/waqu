const {EventEmitter} = require('events')
const WaquWindow = require('./waquWindow')
// const electron = require('electron');
// const {app, BrowserWindow, Menu} = electron;
// const url = require('url');
// const path = require('path');


module.exports = class WaquApplication extends EventEmitter {
  static open () {
    new WaquApplication();
  };

  constructor () {
    super();
    this.waquWindow = new WaquWindow();
  }
}
