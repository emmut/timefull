const { BrowserWindow, app, Menu, ipcMain, Notification } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

let mainWindow;

function createBrowserWindow() {
  mainWindow = new BrowserWindow({
    width: 550,
    height: 650,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // load file to initialize react
  mainWindow.loadFile('index.html');

  // build main menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

// reload on save
if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  });
}

// notifications
ipcMain.on('notify', (event, { title, body }) => {
  const sound = path.join(__dirname, 'src/sounds/notification.wav');
  new Notification({
    title,
    body,
    sound,
    silent: false
  }).show();
});

ipcMain.on('window-on-top', () => {
  mainWindow.show();
});
// // do close application when all windows are closed, except darwin
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// open new window when activated and no windows are present
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createBrowserWindow();
  }
});

// create new window when app is readu
app.whenReady().then(createBrowserWindow);

// default menu
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

// developer menu
if (isDev) {
  mainMenuTemplate.push({
    label: 'Developer tools',
    submenu: [
      {
        label: 'Toggle devtools',
        accelerator: "CmdOrCtrl+'",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
}
