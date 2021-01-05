const { BrowserWindow, app, Menu, ipcMain, Notification } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

let mainWindow;

function createBrowserWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('index.html');

  const mainMenu = Menu.buildFromTemplate(template);
}

// reload on save
if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  });
}

// notifications
ipcMain.on('notify', (event, { title, body }) => {
  new Notification({ title, body }).show();
});

// do close application when all windows are closed, except darwin
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
        click: () => {
          app.quit();
        },
      },
    ],
  },
];

// developer menu
if (isDev) {
  mainMenuTemplate.push([
    {
      label: 'Toggle devtools',
      accelerator: "CmdOrCtrl+'",
      click: (item, focusedWindow) => {
        focusedWindow.toggleDevTools();
      },
    },
    {
      role: 'reload',
    },
  ]);
}
