var video = null;

const init = () => {

	const header = document.getElementById('watch-headline-title');

	if (header) {
		const button = document.createElement('button');
		button.id = 'pip';
		header.appendChild(button);
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
