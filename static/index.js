(function () {
  window.onload = function () {
    console.log('window load');
    const initialize = require('../src/initializeApplication');
    return initialize({});
  };
})();
