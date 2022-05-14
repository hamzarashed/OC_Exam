
var loadProfileImageSection = function () {
	document.write('<img id="covorImage" src="' + getItem("covorImage") + '" alt="" />');
	document.write('<div id="profileImageDiv">');
		document.write('<img id="profileImage" src="' + getItem("profileImage") + '" alt="" />');
		document.write("<label>" + getItem("profileName") + "</label>");
	document.write('</div>');
	
	removeItem("currentFriendProfile");
};
//_________________________________________

var openFriendProfile = function (sender) {
	var friendName = sender.querySelector(".friendName").textContent;
	var friendImage = sender.querySelector(".friendPhoto").attributes.src.textContent;

	var currentFriendProfile = { "name": friendName, "src": friendImage };	
	storeItem("currentFriendProfile", currentFriendProfile, true);
	
	window.location = "friendProfile.html";
};
//_________________________________________


