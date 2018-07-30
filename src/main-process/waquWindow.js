const {BrowserWindow, app} = require('electron');
const {EventEmitter} = require('events')
const url = require('url');
const path = require('path');
// const ICON_PATH = path.resolve(__dirname, '..', '..', 'resources', 'atom.png')

module.exports = class WaquWindow extends EventEmitter {

  constructor(){
    super();

    const options = {
      show: true,
      title: 'Waqu',
      tabbingIdentifier: 'wacu',
      webPreferences: {
        backgroundThrottling: !this.isSpec,
        disableBlinkFeatures: 'Auxclick'
      }
    };

    this.browserWindow = new BrowserWindow(options);
    //Only for debuging
    this.browserWindow.webContents.openDevTools()

    this.browserWindow.loadURL(
      url.format({
        protocol: 'file',
        pathname: path.join(__dirname, '../../static/index.html'),
        slashes: true
      })
    );
  }
}
