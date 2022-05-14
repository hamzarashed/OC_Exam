
getUrlVars = function () {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
		vars[key] = fixTextDecode(value);
	});
	return vars;
};
//_________________________________________

fixTextDecode = function (text) {
    text = decodeURIComponent(text); 
    return text.replace(/[+]/g, " ");
};
//_________________________________________

parseParamsToJson = function (query) {
    var obj = {};
    query.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        //function ($0, $1, $2, $3) { obj[$1] = $3.replace(/\+/g, " "); }
		function ($0, $1, $2, $3) { 
			obj[$1] = fixTextDecode($3); 
		}
    );
    return obj;
};
//_________________________________________

joinNetwork = function (item) {
    var networkName = $(item).attr('name');
    var network = getItem("networkInfo", true) || { name: "", password: "" };
    network.name = networkName;

    storeItem("networkName", networkName, true);
    document.getElementById('popup').style.display = 'block';
};
//_________________________________________

String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
};
//_______________________________________

document.getName = function () {
    var match = document.location.href.match(/[^\/]+$/);
    if (match) {
        return document.location.href.match(/[^\/]+$/)[0];
    }
    return "index.html";
};
//_______________________________________

saveVOIPCallList = function (personName, voipAction) {

    var VOIPListStoreKey = "VOIPList";
    var voipList = getItem(VOIPListStoreKey, true) || [];
    voipList.push({ name: personName, action: voipAction });
    storeItem(VOIPListStoreKey, voipList, true);

};