const { BrowserWindow, app, ipcMain, Notification } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createBrowserWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
}

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

ipcMain.on('notify', (event, {title, body}) => {
  new Notification({ title, body }).show();
});
app.whenReady().then(createBrowserWindow);
