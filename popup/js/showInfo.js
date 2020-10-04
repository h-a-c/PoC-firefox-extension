document.getElementById("recordIcon").addEventListener("click", recordClick);
init();

browser.storage.onChanged.addListener(x => {
	if(typeof(x.request) != "undefined") {
		updateList();
	}
});

function updateList() {
	var th = document.createElement("th");                 // Create a <th> node
	var tr = document.createElement("tr");			// Create a <tr> node
	var textnode1 = document.createTextNode("GET");         // Create a text node
	var textnode2 = document.createTextNode("Google.com"); // Create second text node
	tr.appendChild(th);
	tr.appendChild(textnode1);
	tr.appendChild(th)
	tr.appendChild(textnode2);
	document.getElementById("requestList").appendChild(tr);
}

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
			if(key == "requests") {
				updateList();		
			}
		}
	});
}
