var gettingStoredInfo = browser.storage.local.get(null);

browser.storage.onChanged.addListener(changedData => {
	if(changedData.toggle.newValue == "on") {
		toggleOn();
	} else {
		toggleOff();
	}
});

function toggleOn(){
		
}

function toggleOff(){
	
}

function logURL(requestDetails) {
	console.log("Logging\t" + requestDetails);
}

browser.webRequest.onBeforeRequest.addListener(
	  logURL,
	  {urls: ["<all_urls>"]}
);
