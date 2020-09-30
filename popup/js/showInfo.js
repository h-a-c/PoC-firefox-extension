document.getElementById("recordIcon").addEventListener("click", recordClick);

function recordClick() {
	var iconClass = document.getElementById("recordIcon").className
	if(iconClass == "fa fa-toggle-off") {
		document.getElementById("recordIcon").className = "fa fa-toggle-on";
		browser.storage.local.set({"toggle":"on"});
	} else {
		document.getElementById("recordIcon").className = "fa fa-toggle-off";
		browser.storage.local.set({"toggle":"off"});
	}
}

init();

function init() {
	var storedItems = browser.storage.local.get(null);
	storedItems.then((results) => {
		for(let [key,value] of Object.entries(results)){
			if(key == "toggle") {
				if (value == "on") {
					document.getElementById("recordIcon").className = "fa fa-toggle-on";
				} else {
					document.getElementById("recordIcon").className = "fa fa-toggle-off";
				}

			}
		}
	});
}
