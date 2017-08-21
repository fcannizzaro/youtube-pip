const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const share = require('oshare');
const path = require('path');
const url = require('url');

const SHORTCUT = 'MediaPlayPause';

var win;

const createWindow = (url) => {
	const width = 431;
	const height = 244;
	const x = 1920 - width;
	const y = 1080 - height;
	win = new BrowserWindow({ width, height, x, y, frame: false, alwaysOnTop: true, skipTaskbar: true, resizable: false, transparent: true });
	win.webContents.on('did-finish-load', () => send('start', url));
	win.loadURL(`file://${__dirname}/assets/player.html`);
	win.show();
}

const send = (event, value) => {
	event == 'start' && globalShortcut.register(SHORTCUT, () => send('control'));
	win.webContents.send(event, value);
}

const play = ({ id, time }) => {
	const url = `http://www.youtube.com/embed/${id}?start=${time}&autoplay=1&ecver=1&rel=0&amp;showinfo=0`;
	if (!win) {
		createWindow(url);
	} else {
		send('start', url);
		win.show();
	}
}

ipcMain.on('hide', (event, arg) => {
	if (win) {
		win.hide();
		globalShortcut.unregister(SHORTCUT);
	}
});

share.server(9944, { shared: { play } });
