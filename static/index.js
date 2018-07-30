(function () {
  const getWindowLoadSettings = require('../src/getWindowLoadSettings');

  window.onload = function () {
    console.log('loaded 2');
    console.log(getWindowLoadSettings());
  };
})();
