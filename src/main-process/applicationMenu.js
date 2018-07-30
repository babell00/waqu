const {app, Menu} = require('electron');
const _ = require('underscore-plus');

module.exports = class ApplicationMenu {
  constructor(){
    this.windowTemplates = new WeakMap();
    this.setActiveTemplate(this.getDefaultTemplate());
  }

  setActiveTemplate (template) {
    if (!_.isEqual(template, this.activeTemplate)) {
      this.activeTemplate = template;
      this.menu = Menu.buildFromTemplate(_.deepClone(template));
      Menu.setApplicationMenu(this.menu);
    }
  }

  getDefaultTemplate () {
    return[{
      label: 'Waqu',
      submenu: [{
        label: 'Quit',
        accelerator: 'Command+Q',
        click: () => app.quit()
      },
      {
        label: 'Dupa',
        accelerator: 'Command+D',
        click: () => app.quit()
      }
    ]
    }];
  }
}
