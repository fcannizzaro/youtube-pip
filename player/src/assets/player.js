const ipc = require('electron').ipcRenderer;
const frame = document.getElementById('frame');
const progress = document.getElementById('progress');
const internal = document.getElementById('internal');

var video;

const update = () => {
	internal.style.width = (video.currentTime / video.duration) * 100 + "%";
}

const hide = () => {
	frame.src = "";
	ipc.send('hide');
}

frame.onload = () => {
	const doc = frame.contentDocument || frame.contentWindow.document;
	doc.body.querySelector('.ytp-chrome-bottom').remove();
	doc.body.querySelector('.ytp-cards-button').remove();
	doc.body.querySelector('.ytp-gradient-bottom').remove();
	video = doc.body.querySelector('video');
	video.addEventListener("timeupdate", update);
	setInterval(() => doc.body.querySelector('.branding-img-container').remove(), 1000);
}

progress.addEventListener('click', (e) => {
	video.currentTime = video.duration * (e.clientX / progress.offsetWidth);
	update();
});

ipc.on('start', (event, src) => {
	internal.style.width = "0%";
	frame.src = src;
});

ipc.on('control', (event, src) => {
	if (video) {
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	}
});

ipc.send('did-finish-load');
