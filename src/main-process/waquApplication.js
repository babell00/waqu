const {BrowserWindow, Menu, app, dialog, ipcMain, shell, screen} = require('electron');
const {CompositeDisposable, Disposable} = require('event-kit');
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

    this.applicationMenu = new ApplicationMenu();
    this.disposable = new CompositeDisposable();
    this.windowStack = new WindowStack();
    // this.waquWindow = new WaquWindow();


    //Maybe in the future
    //this.setupDockMenu ();
    this.handleEvents();
  }

  setupDockMenu () {
    if (process.platform === 'darwin') {
      return app.dock.setMenu(Menu.buildFromTemplate([
        {label: 'New Window', click: () => this.emit('application:new-window')}
      ]))
    }
  }

  handleEvents () {
    this.disposable.add(ipcHelpers.on(ipcMain, 'open', (event, options) => {
      const window = this.atomWindowForEvent(event);
      if (options) {
        if (typeof options.pathsToOpen === 'string') {
          options.pathsToOpen = [options.pathsToOpen];
        }

        if (options.pathsToOpen && options.pathsToOpen.length > 0) {
          options.window = window;
          this.openPaths(options);
        } else {
          this.addWindow(new AtomWindow(this, this.fileRecoveryService, options));
        }
      } else {
        this.promptForPathToOpen('all', {window});
      }
    }))
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
