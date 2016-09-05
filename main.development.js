import { app, BrowserWindow, Menu, shell, ipcMain, dialog } from 'electron';

import {diretoryTreeToObj} from './utils';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';

let menu;
let template;
let mainWindow = null;

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) {
      try {
        await installer.default(installer[name], forceDownload);
      } catch (e) {} // eslint-disable-line
    }
  }
};

app.on('ready', async () => {
  await installExtensions();

  mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 500,
    icon: __dirname + '/app.ico'
  });

  mainWindow.loadURL(`file://${__dirname}/app/app.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  ipcMain.on('openfile', (event, arg) => {
    fs.readFile(arg, "utf-8", (err, data) => {
      if (err) throw err;
      mainWindow.webContents.send('readfilecontent', data.toString());
    });
  });

  ipcMain.on('savefile', (event, arg) => {
    const {currentFilePath,fileContent} = JSON.parse(arg);
    console.log(currentFilePath);
    fs.writeFile(currentFilePath, fileContent, err => {
      if(err) {
        return console.log(err);
      }

      mainWindow.webContents.send('successsave');
    });
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
    mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([{
        label: 'Inspect element',
        click() {
          mainWindow.inspectElement(x, y);
        }
      }]).popup(mainWindow);
    });
  }

  if (process.platform === 'darwin') {
    template = [{
      label: 'Markdown',
      submenu: [{
        label: 'Open Folder',
        accelerator: 'Command+O',
        click() {
          const folderPath = dialog.showOpenDialog({properties: ['openFile', 'openDirectory']})[0].replace(/\\/g, '/');
          diretoryTreeToObj(folderPath, (err, res) => {
            let content = '';
            if(err) {
              content = JSON.stringify(err);
            }

            content = JSON.stringify({
              children: res,
              name: path.basename(folderPath),
              id: folderPath,
              type: 'folder'
            });
            if (!res) {
              content = JSON.stringify({
                name: path.basename(folderPath),
                id: folderPath,
                type: 'file'
              });
            }
            mainWindow.webContents.send('loadfiles', content);
          });
        }
      }, {
        label: 'Hide Markdown',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: '&Save',
        accelerator: 'Command+S',
        click() {
          mainWindow.webContents.send('save');
        }
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        }
      }]
    }, {
      label: 'View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: 'Reload',
        accelerator: 'Command+R',
        click() {
          mainWindow.webContents.reload();
        }
      }, {
        label: 'Back',
        click() {
          mainWindow.webContents.goBack();
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click() {
          mainWindow.toggleDevTools();
        }
      }] : [{
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }]
    }, {
      label: 'Window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }]
    }];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = [{
      label: '&File',
      submenu: [{
        label: '&Open',
        accelerator: 'Ctrl+O',
        click() {
          const folderPath = dialog.showOpenDialog({properties: ['openFile', 'openDirectory']})[0].replace(/\\/g, '/');
          diretoryTreeToObj(folderPath, (err, res) => {
            let content = '';
            if(err) {
              content = JSON.stringify(err);
            }
            content = JSON.stringify({
              children: res,
              name: path.basename(folderPath),
              id: folderPath,
              type: 'folder'
            });
            if (!res) {
              content = JSON.stringify({
                name: path.basename(folderPath),
                id: folderPath,
                type: 'file'
              });
            }
            mainWindow.webContents.send('loadfiles', content);
          });
        }
      }, {
        label: '&Save',
        accelerator: 'Ctrl+S',
        click() {
          mainWindow.webContents.send('save');
        }
      }, {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click() {
          mainWindow.close();
        }
      }]
    }, {
      label: '&View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click() {
          mainWindow.webContents.reload();
        }
      }, {
        label: '&Back',
        click() {
          mainWindow.webContents.goBack();
        }
      }, {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click() {
          mainWindow.toggleDevTools();
        }
      }] : [{
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }]
    }];
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }
});
