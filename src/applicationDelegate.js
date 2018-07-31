const {ipcRenderer} = require('electron');
const ipcHelpers = require('./ipcHelpers');


module.exports = class ApplicationDelegate {
  open (params) {
    return ipcRenderer.send('open', params);
  }

  showWindow () {
    return ipcHelpers.call('show-window');
  }

  focusWindow () {
    return ipcHelpers.call('focus-window');
  }
}
