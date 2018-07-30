const {app, BrowserWindow, globalShortcut} = require('electron');
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
    Object.defineProperty(this.browserWindow, 'loadSettingsJSON', {
      get: () => JSON.stringify(Object.assign({
        userSettings: !this.isSpec
          ? this.atomApplication.configFile.get()
          : null
      }, this.loadSettings))
    });

    //Only for debuging
    globalShortcut.register('CommandOrControl+X', () => {
     console.log('openning debuger');
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
