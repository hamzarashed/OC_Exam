
$(document).ready(function () {
	var profileName = getItem("profileName");
	$("#accountNameIcon").text(profileName);
});

//_________________________________________________________________________________________

var getDefaultDateObject = function () {
	return getItem("defaultDate", true);
};

var getDefaultDateString = function () {
	var defaultDate = getItem("defaultDate", true);
	return defaultDate.day + "/" + defaultDate.month + "/" + defaultDate.year;
};
//_________________________________________________________________________________________

var createCalendarDropdownList = function (calendars) {
	var select = document.createElement("select");
	select.id = "calendarNameInp";
	
	for (var i = 0; i < calendars.length; i++) {
		var option = document.createElement("option");
		option.textContent = calendars[i].name;
		select.appendChild(option);
	}
	
	return select;
};
//______________________________________________________________________________________________________________________


var convertArabicNumbertoEnglish = function (arNamber){ // PERSIAN, ARABIC, URDO
var dict = {
  "٠": 0,
  "١": 1,
  "٢": 2,
  "٣": 3,
  "٤": 4,
  "٥": 5,
  "٦": 6,
  "٧": 7,
  "٨": 8,
  "٩": 9

};
     var arabicNumber = arNamber.split("");
    var newValue="";
    for (var i=0;i<arabicNumber.length;i++)
    {
		var number = dict[arNamber[i]];
		if(number){
            newValue=newValue+number;
		}
    }
	if(newValue==""){
		newValue=arNamber;
	}
	
    return newValue;
};
//______________________________________________________________________________________________________________________


//______________________________________________________________________________________________________________________

var getGuestObjectOnEvent = function (eventObject, email) {
	var eventGuest;
	if (eventObject.guests && eventObject.guests.length > 0) {
		for (var i = 0; i < eventObject.guests.length; i++) {
			if (eventObject.guests[i].email == email) {
				eventGuest = eventObject.guests[i];
				break;
			}
		}
	}
	
	return eventGuest;
};
//______________________________________________________________________________________________________________________

var colors = [
	{ bgColor: "rgb(172, 114, 94)", eventBgColor: "#c59c8e", eventBorderColor: "#976544" },
	{ bgColor: "rgb(208, 107, 100)", eventBgColor: "#dd9691", eventBorderColor: "#b15a43" }, 
	{ bgColor: "rgb(248, 58, 34)", eventBgColor: "#f77767", eventBorderColor: "#c95b4b" }, 
	{ bgColor: "rgb(250, 87, 60)", eventBgColor: "#fb8b78", eventBorderColor: "#e34f47" }, 
	{ bgColor: "rgb(255, 117, 55)", eventBgColor: "#ff9f75", eventBorderColor: "#d66e37" }, 
	{ bgColor: "rgb(255, 173, 70)", eventBgColor: "#ffc67f", eventBorderColor: "#e18c1f" }, 
	
	{ bgColor: "rgb(66, 214, 146)", eventBgColor: "#7ce2b3", eventBorderColor: "#49c38f" }, 
	{ bgColor: "rgb(22, 167, 101)", eventBgColor: "#66c59a", eventBorderColor: "#2ea066" }, 
	{ bgColor: "rgb(123, 209, 72)", eventBgColor: "#a4df81", eventBorderColor: "#60c228" }, 
	{ bgColor: "rgb(179, 220, 108)", eventBgColor: "#cae69c", eventBorderColor: "#a0cc34" }, 
	{ bgColor: "rgb(251, 233, 131)", eventBgColor: "#fcefa9", eventBorderColor: "#d7cc56" }, 
	{ bgColor: "rgb(250, 209, 101)", eventBgColor: "#fbdf94", eventBorderColor: "#d8af30" }, 
	
	{ bgColor: "rgb(146, 225, 192)", eventBgColor: "#b3ead3", eventBorderColor: "#5cc8a7" }, 
	{ bgColor: "rgb(159, 225, 231)", eventBgColor: "#bceaee", eventBorderColor: "#4acbc8" }, 
	{ bgColor: "rgb(159, 198, 231)", eventBgColor: "#bcd7ee", eventBorderColor: "#50a2cf" }, 
	{ bgColor: "rgb(73, 134, 231)", eventBgColor: "#88afef", eventBorderColor: "#568ddf" }, 
	{ bgColor: "rgb(154, 156, 255)", eventBgColor: "#b9baff", eventBorderColor: "#686ae7" }, 
	{ bgColor: "rgb(185, 154, 255)", eventBgColor: "#ceb9ff", eventBorderColor: "#8a5feb" }, 
	
	{ bgColor: "rgb(194, 194, 194)", eventBgColor: "#d1d1d1", eventBorderColor: "#afafaf" }, 
	{ bgColor: "rgb(202, 189, 191)", eventBgColor: "#d7cecf", eventBorderColor: "#979192" }, 
	{ bgColor: "rgb(204, 166, 172)", eventBgColor: "#dbc1c5", eventBorderColor: "#a66c76" }, 
	{ bgColor: "rgb(246, 145, 178)", eventBgColor: "#f8b3c9", eventBorderColor: "#e25a87" }, 
	{ bgColor: "rgb(205, 116, 230)", eventBgColor: "#dc9fed", eventBorderColor: "#d255eb" }, 
	{ bgColor: "rgb(164, 122, 226)", eventBgColor: "#c0a3eb", eventBorderColor: "#a55ee7" }
];
//_______________________________________________________

var createCalendarsColorsObject = function (calendars) {
	var colorsExtended = $.extend([], colors);
	
	for (var i = 0; i < calendars.length; i++) {
		if (!calendars[i].color) {
			var r = Math.floor(Math.random() * colorsExtended.length);
			calendars[i].color = $.extend({}, colorsExtended[r]);
			colorsExtended.splice(r, 1);
		}
	}
};
//______________________________________________________________________________________________________________________

var createDateObjectFromDateString =  function (dateString) {
	var dateArray = dateString.split("/");
	return { day: dateArray[0], month: dateArray[1], year: dateArray[2] };
};
//_________________________________________

var createDateStringFromDateObject =  function (dateObject) {
	var d = dateObject.getDate().toString();
	var m = (dateObject.getMonth() + 1).toString();
	var y = dateObject.getFullYear().toString();

	var dateString = (d.length == 1 ? "0" + d : d) + "/" + (m.length == 1 ? "0" + m : m) + "/" + y;
	return dateString;
};
//_________________________________________

var createTimeObjectFromTimeString =  function (timeString) {
	var timeObject = null;

	var isTimeAM = timeString.indexOf("ص") != -1;
	var timeArray = timeString.replace("ص", "").replace("م", "").split(":");
	
	if (isTimeAM) {
		timeObject = { hour: timeArray[0] == "12" ? "00" : timeArray[0], minute: timeArray[1] || "00" };
	}
	else {
		timeArray[0] = convertArabicNumbertoEnglish(timeArray[0]);

		timeObject = { hour: timeArray[0] == "12" ? "12" : (parseInt(timeArray[0]) + 12).toString(), minute: timeArray[1] || "00" };
	}
	
	return timeObject;
};
//______________________________________________________________________________________________________________________

var createTimeStringFromTimeObject =  function (timeObject) {
	var hour = timeObject.hour == "00" || timeObject.hour == "12" ? "12" : (parseInt(timeObject.hour) % 12).toString();
	hour = hour.length == 1 ? "0" + hour : hour;
	
	var minute = timeObject.minute.toString();
	
	minute = minute.length == 1 ? "0" + minute : minute;

	return hour + ":" + minute + (parseInt(timeObject.hour) < 12 ? "ص" : "م");
};
//______________________________________________________________________________________________________________________












