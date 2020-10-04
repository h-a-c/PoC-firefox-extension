document.getElementById("recordIcon").addEventListener("click", recordClick);
init();

browser.storage.onChanged.addListener(x => {
	if(typeof(x.request) != "undefined") {
		var newRequest = getDiff(x.request);
		updateList(newRequest);
	}
});

function getDiff(request) {
	var newValue = JSON.parse(request.newValue);
	return newValue[newValue.length-1];
}

function updateList(request) {
	var table = document.getElementById("requestTable");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	cell1.innerHTML = request.method;
	cell2.innerHTML = request.originUrl;
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
			if(key == "request") {
				var requestList = JSON.parse(value);
				for(i = 0; i < requestList.length; i++) {
					updateList(requestList[i]);
				}
			}
		}
	});
}
