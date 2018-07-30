const {app, BrowserWindow, globalShortcut} = require('electron');
const {EventEmitter} = require('events')
const url = require('url');
const path = require('path');
// const ICON_PATH = path.resolve(__dirname, '..', '..', 'resources', 'atom.png')

module.exports = class WaquWindow extends EventEmitter {

  constructor(delegat){
    super();
    this.delegat = delegat;

    const options = {
      show: false,
      title: 'Waqu',
      tabbingIdentifier: 'wacu',
      webPreferences: {
        // backgroundThrottling: !this.isSpec,
        disableBlinkFeatures: 'Auxclick'
      }
    };

    this.browserWindow = new BrowserWindow(options);

    //Only for debuging
    globalShortcut.register('CommandOrControl+X', () => {
     console.log('openning debugger');
     this.browserWindow.webContents.openDevTools()
   })

    this.browserWindow.loadURL(
      url.format({
        protocol: 'file',
        pathname: path.join(__dirname, '../../static/index.html'),
        slashes: true
      })
    );
  }
}
