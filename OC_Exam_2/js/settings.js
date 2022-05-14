
var settings = getItem("settings", true);

//_____________________________________

var loadGeneralLink = function () {
	var generalLink = document.getElementById("generalLink");
	onSettingTabClick(generalLink);
};
//_____________________________________

var onSettingTabClick = function (sender) {
	var selectedLinkTextContent = sender.getAttribute('name');
	var text = sender.getAttribute('text');
	//***** Left Section *****//
	// 1. Set a background color for selected link
	var settingsLinks = document.getElementsByClassName("settingLink");
	for (var i = 0; i < settingsLinks.length; i++) {
		settingsLinks[i].style.background = "";
	}
	sender.style.background = "#E0E0E0";
	
	//***** Right Section *****//
	// 2. Change the title name
	document.getElementById("settingsTitle").textContent = selectedLinkTextContent ;
	
	// 3. Display the settings ccontent for selected link
	var settingsContainer = document.getElementsByClassName("settingsContainer");
	for (var i = 0; i < settingsContainer.length; i++) {
		settingsContainer[i].style.display = "none";
	}
	document.getElementById(text).style.display = "block";
};
//_____________________________________

var createYesNoDropdown = function () {
	document.write("<select><option>نعم</option><option selected>لا</option></select>");
};
//_____________________________________

var createPrivacyDropdown = function (id, allowPublic, allowFriendsOfFriends, allowFriends, allowCustom) {
	document.write("<select id='" + id + "'>");
	document.write("<option></option>");
	if(allowPublic) { document.write("<option value='a'>عام</option>"); }
	if(allowFriendsOfFriends) { document.write("<option>أصدقاء الأصدفاء</option>"); }
	if(allowFriends) { document.write("<option>الأصدقاء</option>");  }
	if(allowCustom) { document.write("<option>مخصص</option>");  }
	document.write("</select>");
};
//_____________________________________

var createFiendsDropdown = function () {
	document.write("<select>");
	for(var i = 0; i < friends.length; i++) { 
		document.write("<option>" + friends[i].name  + "</option>"); 
	}
	document.write("</select>");
};
//_________________________________________________________________________________________________________

var loadPrivacySettingsValues = function () {
	$("#privacy-can-read").val(settings.privacy.canRead);
	$("#privacy-can-write").val(settings.privacy.canWrite);
	$("#privacy-friend-request").val(settings.privacy.canInviteMe);
};
//_____________________________________

var onSavePrivacySettingsBtnClick = function () {
	settings.privacy.canRead = $("#privacy-can-read").val();
	settings.privacy.canWrite = $("#privacy-can-write").val();
	settings.privacy.canInviteMe = $("#privacy-friend-request").val();

	storeItem("settings", settings, true);
	
	showSavedMessage();
};
//_____________________________________

var showSavedMessage = function () {

	showDialog("حفظ", "تم حفظ المعلومات بنجاح", [ { label: "موافق" } ]);	
	loadGeneralLink();
};
//_____________________________________



