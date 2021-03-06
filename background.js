var storedInfo = browser.storage.local.get(null);
var record = false;
browser.storage.onChanged.addListener(storedInfo => {
	if(typeof(storedInfo.toggle) != "undefined" && storedInfo.toggle.newValue == "on"){
		toggleOn();
	} else if(typeof(storedInfo.toggle) != "undefined" && storedInfo.toggle.newValue == "off"){
		toggleOff();
	}
});

function toggleOn(){
	record = true;	
}
function toggleOff(){
	record = false;
}

function logURL(requestDetails) {
	if(record) {
		browser.storage.local.get(null).then((results) => {
			if(typeof(results.request) == "undefined") {
				browser.storage.local.set({"request":JSON.stringify([])});
			}
			for(let [key, value] of Object.entries(results)) {
				if (key == "request") {
					var requestList = JSON.parse(value);
					if(requestList.length < 50) {
						requestList.push(requestDetails);
						browser.storage.local.set({"request":JSON.stringify(requestList)});
					}
				}
			}
		});
	}
}

browser.webRequest.onBeforeRequest.addListener(
	  logURL,
	  {urls: ["<all_urls>"]}
);
