// data is saved in local storage instead of cookie according to the size limitation of the former.
// local storage data is posted to server on each store request.
storeItem = function (name, value, isJsonString, isLocal) {
	if(isJsonString) {
	    localStorage.setItem(name, JSON.stringify(value));
	}
	else {
	    localStorage.setItem(name, value);
	}

	if (!isLocal) {
	    $.post($(location).attr('href'), postData = { localStorage: localStorage });
	}
};
//_________________________________________

getItem = function (name, isJsonString) {
	var value = localStorage.getItem(name);
	if(isJsonString) {
		return value ? JSON.parse(value) : null;
	}
	else {
		return localStorage.getItem(name);
	}
};
//_________________________________________

removeItem = function (name) {
    localStorage.removeItem(name);
};

//______________________________________________________________________________________________________________________
/*
storeItem = function (name, value, isJsonString) {
	if(isJsonString) {
		$.cookie(name, JSON.stringify(value)); 
	}
	else {
		$.cookie(name, value); 
	}
};
//_________________________________________

getItem = function (name, isJsonString) {
	var value = $.cookie(name);
	if(isJsonString) {
		return value ? JSON.parse(value) : null;
	}
	else {
		return $.cookie(name);
	}
};
//_________________________________________

removeItem = function (name) {
	$.removeCookie(name);
};*/
//______________________________________________________________________________________________________________________

