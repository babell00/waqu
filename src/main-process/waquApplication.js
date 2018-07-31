const {BrowserWindow, Menu, app, dialog, ipcMain, shell, screen} = require('electron');
const {CompositeDisposable, Disposable} = require('event-kit');
const {EventEmitter} = require('events');
const os = require('os');
const path = require('path');
const WaquWindow = require('./waquWindow');
const ApplicationMenu = require('./applicationMenu');
const ipcHelpers = require('../ipcHelpers');

module.exports = class WaquApplication extends EventEmitter {
  static open (options) {
    new WaquApplication(options);
  };

  constructor (options) {
    super();
    global.waquApplication = this;

    this.applicationMenu = new ApplicationMenu();
    this.disposable = new CompositeDisposable();
    this.windowStack = new WindowStack();


    //Maybe in the future
    //this.setupDockMenu ();
    this.handleEvents();

    this.openWindow();
  }

  openWindow(){
    const window = new WaquWindow(this, {});
    this.addWindow(window)
    window.focus()
  }

  addWindow (window) {
    this.windowStack.addWindow(window);
  }

  setupDockMenu () {
    if (process.platform === 'darwin') {
      return app.dock.setMenu(Menu.buildFromTemplate([
        {label: 'New Window', click: () => this.emit('application:new-window')}
      ]))
    }
  }

  handleEvents() {
    this.disposable.add(ipcHelpers.respondTo('show-window', window => window.show()))
  }
}




class WindowStack {
  constructor (windows = []) {
    this.addWindow = this.addWindow.bind(this);
    this.touch = this.touch.bind(this);
    this.removeWindow = this.removeWindow.bind(this);
    this.getLastFocusedWindow = this.getLastFocusedWindow.bind(this);
    this.all = this.all.bind(this);
    this.windows = windows;
  }

  addWindow (window) {
    this.removeWindow(window);
    return this.windows.unshift(window);
  }

  touch (window) {
    return this.addWindow(window);
  }

  removeWindow (window) {
    const currentIndex = this.windows.indexOf(window);
    if (currentIndex > -1) {
      return this.windows.splice(currentIndex, 1);
    }
  }

  getLastFocusedWindow (predicate) {
    if (predicate == null) {
      predicate = win => true;
    }
    return this.windows.find(predicate);
  }

  all () {
    return this.windows;
  }
}
