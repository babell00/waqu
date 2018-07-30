(function () {
  const getWindowLoadSettings = require('../src/getWindowLoadSettings')
    console.log('loaded 1');
  window.onload = function () {
    console.log('loaded 2');
    console.log(getWindowLoadSettings());
  };
})();
