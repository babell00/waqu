const {app, BrowserWindow, globalShortcut} = require('electron');
const {EventEmitter} = require('events')
const url = require('url');
const path = require('path');
// const ICON_PATH = path.resolve(__dirname, '..', '..', 'resources', 'atom.png')

module.exports = class WaquWindow extends EventEmitter {

  constructor(delegat, settings = {}){
    super();
    this.delegat = delegat;

    const options = {
      show: true,
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
      this.browserWindow.webContents.openDevTools()

    this.browserWindow.loadURL(
      url.format({
        protocol: 'file',
        pathname: path.join(__dirname, '../../static/index.html'),
        slashes: true
      })
    );
  }

  close () {
    return this.browserWindow.close()
  }

  focus () {
    return this.browserWindow.focus()
  }

  minimize () {
    return this.browserWindow.minimize()
  }

  maximize () {
    return this.browserWindow.maximize()
  }

  unmaximize () {
    return this.browserWindow.unmaximize()
  }

  restore () {
    return this.browserWindow.restore()
  }
}
