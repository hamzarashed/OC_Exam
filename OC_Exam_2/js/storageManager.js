
// for development test
let storeItem = function (name, value, isJsonString, isLocal) {
    if (isJsonString) {
        localStorage.setItem(name, JSON.stringify(value));
        //$.cookie(name, JSON.stringify(value));
    }
    else {
        localStorage.setItem(name, value);
        //$.cookie(name, value);
    }

    // if (!isLocal) {
    //     //$.post($(location).attr('href'), localStorage);
    //     $.post($(location).attr('href'), postData = { localStorage: localStorage });
    // }
};
//_________________________________________

let getItem = function (name, isJsonString) {
    var value = localStorage.getItem(name);
    if (isJsonString) {
        return value ? JSON.parse(value) : null;
    }
    else {
        return localStorage.getItem(name);
    }
};
//_________________________________________

let removeItem = function (name) {
    localStorage.removeItem(name);
    //$.removeCookie(name);
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

