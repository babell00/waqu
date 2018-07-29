const electron = require('electron');
const url = require('url');
const path = require('path');
const {app, BrowserWindow, Menu} = electron;

let mainWindow;

app.on('ready', function(){
  //Create main window
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'view/mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }))

  //Build menu
  let mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

});

let mainMenuTemplate = [
  {
    lable:'File',
    submenu: [{
      label: 'Add Item'
    },
    {
      label: 'Quit',
      click(){
        app.quit();
      }
    }
  ],
  }
];
