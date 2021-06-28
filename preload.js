const { ipcRenderer, contextBridge } = require('electron');
const path = require('path');

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send('notify', message);
    }
  },
  move: {
    top: () => {
      ipcRenderer.send('window-on-top');
    }
  }
});
