const {app, globalShortcut} = require('electron');
const path = require('path');
module.exports = function start(){

  process.on('uncaughtException', function (error = {}) {
    if (error.message != null) {
      console.log(error.message);
    }

    if (error.stack != null) {
      console.log(error.stack);
    }
  });

  process.on('unhandledRejection', function (error = {}) {
    if (error.message != null) {
      console.log(error.message);
    }

    if (error.stack != null) {
      console.log(error.stack);
    }
  });


  const args =  {}//parseCommandLine(process.argv.slice(1)) check Atom code
  //Check Atom example
  // const config = getConfig();
  // const colorProfile = config.get('core.colorProfile');

  app.on('ready', function () {
    const waquApplicationModulePath = path.join(__dirname, 'waquApplication');
    console.log(waquApplicationModulePath);
    const WaquApplication = require(waquApplicationModulePath);
    WaquApplication.open(args)
  });
}
