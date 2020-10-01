document.getElementById("recordIcon").addEventListener("click", recordClick);
init();

function recordClick() {
	var iconClass = document.getElementById("recordIcon").className
	if(iconClass == "fa fa-toggle-off") {
		toggleOn();
	} else {
		toggleOff();
	}
}

function toggleOn() {
	document.getElementById("recordIcon").className = "fa fa-toggle-on";
	document.getElementById("state").innerHTML = "running";
	browser.storage.local.set({"toggle":"on"});
	browser.storage.local.set({"json":"{json here}"});
}


function toggleOff() {
	document.getElementById("recordIcon").className = "fa fa-toggle-off";
	document.getElementById("state").innerHTML = "stopped";
	browser.storage.local.set({"toggle":"off"});
}

function init() {
	var storedItems = browser.storage.local.get(null);
	storedItems.then((results) => {
		for(let [key,value] of Object.entries(results)){
			if(key == "toggle") {
				if (value == "on") {
					toggleOn();
				} else {
					toggleOff();
				}

			}
		}
	});
}
