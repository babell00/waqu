const {remote} = require('electron');

let windowLoadSettings = null;

module.exports = () => {
  console.log(windowLoadSettings);
  if (!windowLoadSettings) {
    console.log(remote.getCurrentWindow());
    windowLoadSettings = JSON.parse(remote.getCurrentWindow().loadSettingsJSON);
  }
  return windowLoadSettings;
}
