var video = null;

const init = () => {

	if (location.pathname == '/watch') {
		const button = document.createElement('button');
		button.id = 'pip';
		document.body.appendChild(button);
		button.addEventListener('click', function() {
			video = document.getElementsByClassName('video-stream')[0];
			const time = Math.round(video.currentTime);
			const id = location.search.split('v=')[1].split('&')[0];
			video.pause();
			chrome.runtime.sendMessage({ id, time });
		});
	}

}

chrome.runtime.onMessage.addListener((request, sender) => {
	if (request == 'init') {
		setTimeout(init, 1000);
	}
});

init();
