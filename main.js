const path = require('path');
const { app, BrowserWindow } = require('electron');

const isDev = process.env.NODE_ENG !== 'production';
const isMac = process.platform === 'darwin';

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Find Random Address',
    width: isDev ? 1000 : 500,
    height: 600,
  });
  // open dev tools only in dev env

  if (isDev) mainWindow.webContents.openDevTools();

  mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});
