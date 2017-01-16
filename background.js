//blocks a site when it's updated if it is contained in the block list and focus time is active
chrome.tabs.onUpdated.addListener(function(tabId, changedInfo, tab) {
	if(BLOCKER.getStatus() === "focus"){
		for (site in BLOCKER.getBlockedSites()) {
			if (tab.url.match(site)) {
				chrome.tabs.update(tabId, {"url" : BLOCKER.getRedirect()}, function () {});
			}
		}
	}
});

//blocks a site when it's created if it is contained in the block list and focus time is active
chrome.tabs.onCreated.addListener(function(tab) {
	if(BLOCKER.getActive() === "focus"){
		for (site in BLOCKER.getBlockedSites()) {
			if (tab.url.match(site)) {
				chrome.tabs.update(tab.id, {"url" : BLOCKER.getRedirect()}, function () {});
			}
		}
	}
});