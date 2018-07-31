module.exports = class WaquEnvironment {
  constructor (params = {}) {
    this.applicationDelegate = params.applicationDelegate;
    this.document = params.document;
    this.window = params.window;
    console.log(params.document);
    console.log(params.window);
  }

  async startMainWindow(){
    const steps = [
      this.restoreWindowBackground(),
      this.show(),
      this.focus()
    ]
    await Promise.all(steps)
  }

  restoreWindowBackground () {
    const backgroundColor = '#0074D9'; //TODO this need to be fixed;
    if (backgroundColor) {
      this.backgroundStylesheet = document.createElement('style');
      this.backgroundStylesheet.type = 'text/css';
      this.backgroundStylesheet.innerText = `html, body { background: ${backgroundColor} !important; }`;
      console.log()
      document.head.appendChild(this.backgroundStylesheet);
    }
  }

  show () {
    return this.applicationDelegate.showWindow();
  }

  focus () {
    this.applicationDelegate.focusWindow();
    return this.window.focus();
  }
}
