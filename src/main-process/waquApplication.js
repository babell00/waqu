const {BrowserWindow, Menu, app, dialog, ipcMain, shell, screen} = require('electron');
const {EventEmitter} = require('events');
const os = require('os');
const WaquWindow = require('./waquWindow');
const ApplicationMenu = require('./applicationMenu');


module.exports = class WaquApplication extends EventEmitter {
  static open (options) {
    new WaquApplication(options);
  };

  constructor (options) {
    super();
    global.waquApplication = this;

    this.getAllWindows = this.getAllWindows.bind(this);
    this.applicationMenu = new ApplicationMenu();

    this.waquWindow = new WaquWindow();

  }

  exit (status) {
    app.exit(status);
  }

  async destroy () {
    const windowsClosePromises = this.getAllWindows().map(window => {
      window.close();
      return window.closedPromise;
    })
    await Promise.all(windowsClosePromises)
    this.disposable.dispose();
  }

  getAllWindows () {
    return this.windowStack.all().slice();
  }
}
