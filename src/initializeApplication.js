const ApplicationDelegate = require('./applicationDelegate');
const WaquEnvironment = require('./waquEnvironment');


global.waqu = new WaquEnvironment({
  window: window,
  document: document,
  applicationDelegate: new ApplicationDelegate
});

module.exports = function (args) {
  console.log('initializeApplication');

  global.waqu.startMainWindow();
}
