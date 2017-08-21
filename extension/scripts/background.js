const tabs = {};
var listener = null;

oshare('http://localhost:9944', {}, (play) => {
	chrome.runtime.onMessage.removeListener(listener);
	listener = (request, sender, sendResponse) => play(request);
	chrome.runtime.onMessage.addListener(listener);
});

chrome.tabs.onUpdated.addListener((id, change, tab) => {
	if (change.status == 'loading' && /https?:\/\/(www\.)?youtube.com\/watch.*/.test(change.url)) {
		tabs[id] = true;
	} else if (change.status == 'complete' && tabs[id]) {
		delete tabs[id];
		chrome.tabs.sendMessage(id, "init");
	}
});
