
var emailAccount = getItem("emailAccount");
var isLoggedInUserInvitedToAttendThisEvent;

var tempRepeat = {};
var tempGuests = [];

//___________________________________________________

var createTimeDropdown = function (id, className, title) {
    var select = document.createElement("select");

    for (var i = 0; i <= 23; i++) {
        var h = (i == 0 || i == 12) ? 12 : i % 12;

        var hourString = h < 10 ? "0" + h : h.toString();
        var unit = i < 12 ? "ص" : "م";

        var option = document.createElement("option");
        option.textContent = hourString + ":00" + unit;
        select.appendChild(option);

        var option2 = document.createElement("option");
        option2.textContent = hourString + ":30" + unit;
        select.appendChild(option2);
    }

    select.id = id;
    select.className = className;
    select.title = title;

    return select;
};
//___________________________________________________

var loadValues = function () {
        loadTimeInputValues();
        onRemoveVideoCallClick();
        loadCalendarList();
        loadColors();
        loadEventData();
};
//___________________________________________________

var loadTimeInputValues = function () {
    var fromTime = createTimeDropdown("fromTimeInp", "inp dateInput", "From time");
    document.getElementById("fromTimeInpContainer").appendChild(fromTime);
    $(fromTime).val("12:00م");

    var toTime = createTimeDropdown("toTimeInp", "inp dateInput", "Until time");
    document.getElementById("toTimeInpContainer").appendChild(toTime);
    $(toTime).val("01:00م");   
};
//___________________________________________________

var loadCalendarList = function () {
    var calendarList = getItem("calendars", true);

    var select = createCalendarDropdownList(calendarList);

    document.getElementById("calendarListTd").appendChild(select);
};
//___________________________________________________

var loadColors = function () {
    var colorsContainer = document.getElementById("colorsContainer");

    var colors = ["rgb(84, 132, 237)", "rgb(164, 189, 252)", "rgb(70, 214, 219)", "rgb(122, 231, 191)",
					"rgb(81, 183, 73)", "rgb(251, 215, 91)", "rgb(255, 184, 120)", "rgb(255, 136, 124)",
					"rgb(220, 33, 39)", "rgb(219, 173, 255)", "rgb(225, 225, 225)"];

    for (var i = 0; i < colors.length; i++) {
        var colorBlock = document.createElement("div");
        colorBlock.className = "colorBlock";
        colorBlock.style.background = colors[i];

        colorsContainer.appendChild(colorBlock);
    }
};
//___________________________________________________

var loadNotificationValues = function (notifications) {
    if (notifications && notifications.length > 0) {

        for (var i = 0; i < notifications.length; i++) {
            onAddNotificationClick(notifications[i].type, notifications[i].reminderNumber, notifications[i].reminderType);
        }
    }
};
//___________________________________________________

var loadGuestsValues = function (guests) {
    if (guests) {
        for (var i = 0; i < guests.length; i++) {
            addGuest(guests[i]);
        }
    }
};
//___________________________________________________

var createDatepicker = function (fromDateObject, toDateObject) {
    var onFromDateSelect = function (formattedDates, date, object) {
    	datepickerTo.setValue(formattedDates, "toDateInp");
    }

    var elFromDate = document.getElementById("fromDateInp");
    var datepickerFrom = new DatepickerObject(elFromDate, { currentDate: fromDateObject.month + "/" + fromDateObject.day + "/" + fromDateObject.year, onSelect: onFromDateSelect });
    
    var elToDate = document.getElementById("toDateInp");
    var datepickerTo = new DatepickerObject(elToDate, { currentDate: toDateObject.month + "/" + toDateObject.day + "/" + toDateObject.year });


    //$(selector).datepicker($.datepicker.regional["fr"]);

};
//___________________________________________________

var showAttendEventContainer = function (currentEventGuest) {
	var attendEventOptions = { 
		yes: { text: "نعم، سأذهب", color: "#093" }, 
		maybe: { text: "ربما سأذهب", color: "#666" }, 
		no: { text: "لا، لن أذهب", color: "#900" },
	};

	var attendEventValue = currentEventGuest.attendEvent;
	
	$("#attendEventContainer").css("display", "block");
	
	if (attendEventValue) {
		$("#attendEventInfoContainer").css("display", "block");
		$("input[name='attendEvent'][value='" + attendEventValue + "']").attr("checked", "true");
		$("#attendEventStatus").html(attendEventOptions[attendEventValue].text).css("color", attendEventOptions[attendEventValue].color);
	}
	else {
		$("#attendEventFormTable").css("display", "block");
	}
};
//___________________________________________________

var onAttendEventFormLinkClick = function () {
	$("#attendEventInfoContainer").css("display", "none");
	$("#attendEventFormTable").css("display", "block");
};
//___________________________________________________

var loadEventData = function () {
    var editEvent = getItem("editEvent", true);
    var createEventOnCalendar = getItem("createEventOnCalendar");
	var createEventByTitle = getItem("createEventByTitle");
	
    if (editEvent) {
		var currentEventGuest = getGuestObjectOnEvent(editEvent, emailAccount);
		isLoggedInUserInvitedToAttendThisEvent = currentEventGuest ? true : false;
		
		if (isLoggedInUserInvitedToAttendThisEvent) {
			showAttendEventContainer(currentEventGuest);
		}
    
    	$("#eventTitleInp").val(editEvent.name);
    	$("#fromDateInp").val(editEvent.fromDate);
    	$("#toDateInp").val(editEvent.toDate);
    	$("#fromTimeInp").val(editEvent.fromTime);
    	$("#toTimeInp").val(editEvent.toTime);   	
        $("#alDaysInp").prop("checked", editEvent.isAllDay == "true");
        $("#repeatInp").prop("checked", editEvent.isRepeat == "true");
        $("#whereInp").val(editEvent.where || ""); 
        $("#calendarNameInp").val(editEvent.calendarName); 
        $("#descriptionInp").val(editEvent.description || ""); 
        $("#canModifyEventInp").prop("checked", editEvent.canModifyEvent == "true");
        $("#canInviteOthersInp").prop("checked", editEvent.canInviteOthers == "true");
        $("#canSeeGuestListInp").prop("checked", editEvent.canSeeGuestList == "true");
        //tempRepeat;
        loadNotificationValues(editEvent.notifications);
        loadGuestsValues(editEvent.guests);
        
        createDatepicker(editEvent.fromDateObject, editEvent.toDateObject);
    }
    else if (createEventOnCalendar) {
        removeItem("createEventOnCalendar");
        $("#calendarNameInp").val(createEventOnCalendar); 
    }
    else if (createEventByTitle) {
        removeItem("createEventByTitle");
        $("#eventTitleInp").val(createEventByTitle); 
    }
    
    if (!editEvent) {
		var dateString = getDefaultDateString();
		var dateStringObject = getDefaultDateObject();
	    $("#fromDateInp").val(dateString); 
	    $("#toDateInp").val(dateString); 
	    
	    createDatepicker(dateStringObject, dateStringObject);
	}
};
//___________________________________________________

var onAddVideoCallClick = function () {
    var td = document.getElementById("videoCallTd");
    td.hasVideoCall = "true";

    td.innerHTML = '\
		<img src="../img/videoCall.png" alt="" />\
		<span class="spanLink">Join meeting</span><br />\
		<span class="spanLink" onclick="onRemoveVideoCallClick(this);">إزالة</span>\
	';
};
//________________________

var onRemoveVideoCallClick = function () {
    var td = document.getElementById("videoCallTd");
    delete td.hasVideoCall;

    td.innerHTML = '<span class="spanLink" onclick="onAddVideoCallClick(this);">إضافة مكالمة فيديو</span>';
};
//___________________________________________________

var onAddNotificationClick = function (optNotificationTypeValue, optReminderTimeNumberValue, optReminderTimeValue) {
    if (document.getElementsByClassName("notificationRow").length < 5) {
		if ($("#noNotificationsSetSpan").css("display") != "none") {
			$("#noNotificationsSetSpan").css("display", "none");
		}

        var notificationType = $('<select class="notificationType" title="نوع الإشعار">')
			.append("<option>بريد إلكتروني</option>")
			.append("<option>إشعار</option>");

        var reminderTimeNumber = $('<input type="text" class="reminderTimeNumber" title="وقت التذكير" value="' + (optReminderTimeNumberValue || '10') + '"/>');

        var reminderTime = $('<select class="reminderTime" title="وقت التذكير">')
			.append('<option>دقيقة (دقائق)</option>')
			.append('<option>ساعة (ساعات)</option>')
			.append('<option>يوم (أيام)</option>')
			.append('<option>أسابيع</option>');

        var removeNotification = $('<img src="../img/close.png" class="removeNotification" alt="" onclick="onRemoveNotificationClick(this);" />');

        var notificationDiv = $("<div>");
        notificationDiv.addClass("notificationRow");
        notificationDiv.append(notificationType).append(reminderTimeNumber).append(reminderTime).append(removeNotification);

        $("#notificationList").append(notificationDiv);

        notificationType.value = optNotificationTypeValue || "Pop-up";
        reminderTime.value = optReminderTimeValue || "minutes";
    }
};
//___________________________________________________

var onRemoveNotificationClick = function (sender) {
    var notificationDiv = $(sender).closest("div")[0];
    document.getElementById("notificationList").removeChild(notificationDiv);
	
	if (document.getElementsByClassName("notificationRow").length == 0) {
		$("#noNotificationsSetSpan").css("display", "inline");
	}
};
//___________________________________________________

var addGuest = function (guest) {
	var email = guest.email.toLowerCase();
	var attendEvent = guest.attendEvent;
	
    var guestContainer = $("<div>").addClass("guestContainer");
    
    var personIcon = $('<img src="../img/person.png" class="personIcon" alt="" />');
    var attendEventSpan = $('<span class="attendEvent">');
    var emailSpan = $('<span class="guestEmail">').append(email);
    var removeGuestIcon = $('<img src="../img/close.png" class="removeGuest" alt="" onclick="onRemoveGuestClick(this);" />');
    
     if (attendEvent) {
    	var attendEventImage = attendEvent == "yes" ? "../img/attendEvent-accept.png" : (attendEvent == "no" ? "../img/attendEvent-decline.png" : "../img/attendEvent-maybe.png");
    	var attendEventIcon = $('<img src="' + attendEventImage + '" class="attendEventIcon" alt="" />');
    	attendEventSpan.append(attendEventIcon);
    }
    
	guestContainer.append(personIcon).append(attendEventSpan).append(emailSpan).append(removeGuestIcon);
    $("#guestList").append(guestContainer);

    tempGuests.push( { email: email, attendEvent: attendEvent });
};
//___________________________________________________

var onAddGuestBtnClick = function () {
    var guestEmailAddress = $("#addGuestInp").val().trim().toLowerCase();

    if (guestEmailAddress) {
        var isGuestExist = false;
        for (var i = 0; i < tempGuests.length; i++) {
            if (tempGuests[i].email == guestEmailAddress) {
                isGuestExist = true;
                break;
            }
        }

        if (!isGuestExist) {
            addGuest({ email: guestEmailAddress, attendEvent: "" });
        }

     	$("#addGuestInp").val("");
    }
};
//___________________________________________________

var onRemoveGuestClick = function (sender) {
    var guestEmailContainer = $(sender).closest("div")[0];
    var guestEmail = guestEmailContainer.querySelector(".guestEmail").textContent;

    var index = -1;
    for (var i = 0; i < tempGuests.length; i++) {
        if (tempGuests[i].email == guestEmail) {
            index = i;
            break;
        }
    }

    if (index > -1) {
        tempGuests.splice(index, 1);
    }

    document.getElementById("guestList").removeChild(guestEmailContainer);
};
//___________________________________________________

var onBackBtnClick = function (isDiscard) {
    var backPage = function () {
        window.history.back();
    }

    if (isDiscard) {
        backPage();
    }
    else {
        showDialog("الحدث الخاص", "لم يتم حفظ هذا الحدث الخاص بك.", [ { label: "تجاهل", callback: backPage }, { label: "مواصلة التحرير" } ]);
    }
};
//___________________________________________________

var getNotificationValues = function () {
    var notifications = [];
    var notificationList = $("#notificationList").children();
    for (var i = 0; i < notificationList.length; i++) {
        notifications.push({
            type: notificationList[i].querySelector(".notificationType").value,
            reminderNumber: notificationList[i].querySelector(".reminderTimeNumber").value,
            reminderType: notificationList[i].querySelector(".reminderTime").value
        });
    }

    return notifications;
};
//___________________________________________________

var onSaveBtnClick = function () {
    var eventName = $("#eventTitleInp").val();
    
    if (eventName) {
	    var fromDate = $("#fromDateInp").val();
	    var toDate = $("#toDateInp").val();
	    var fromTime = $("#fromTimeInp").val();
	    var toTime = $("#toTimeInp").val();
	    var isAllDay = $("#alDaysInp").prop("checked") ? "true" : "false";
	    var isRepeat = $("#repeatInp").prop("checked") ? "true" : "false";
	    var where = $("#whereInp").val().trim();
	    var videoCall = $("#videoCallTd")[0].hasVideoCall ? "true" : "false";
	    var calendarName = $("#calendarNameInp").val().trim();
	    var description = $("#descriptionInp").val().trim();
	    var canModifyEvent = $("#canModifyEventInp").prop("checked") ? "true" : "false";
	    var canInviteOthers = $("#canInviteOthersInp").prop("checked") ? "true" : "false";
	    var canSeeGuestList = $("#canSeeGuestListInp").prop("checked") ? "true" : "false";

	    var notifications = getNotificationValues();
	    var guests = tempGuests;
	    var repeat = tempRepeat;

	    var eventObject = {
	        name: eventName, fromDate: fromDate, toDate: toDate, fromTime: fromTime, toTime: toTime, 
	        calendarName: calendarName, 
	        guestPermissions: { canModifyEvent: canModifyEvent, canInviteOthers: canInviteOthers, canSeeGuestList: canSeeGuestList }
	    };
		
	    var eventList = getItem("events", true);
	    var editEvent = getItem("editEvent", true);
	    
	    // edit event
	    var originalEvent = {};
	    var index = -1;
	    if (editEvent) {
	        for (var i = 0; i < eventList.length; i++) {
	            var e = eventList[i];
	
	            if (e.name == editEvent.name && e.fromDate == editEvent.fromDate && e.toDate == editEvent.toDate && e.fromTime == editEvent.fromTime && e.toTime == editEvent.toTime) {
	                originalEvent = eventObject;
	                index = i;
	                break;
	            }
	        }	    
	    }
	    
		//*************
		// Remove this comment if needed in to include these values in the future
		/* 
    	if (isAllDay || (editEvent && originalEvent.hasOwnProperty("isAllDay"))) {
    		eventObject["isAllDay"] = isAllDay;
    	}
    	if (where || (editEvent && originalEvent.hasOwnProperty("where"))) {
    		eventObject["where"] = where;
    	}
    	if (videoCall || (editEvent && originalEvent.hasOwnProperty("videoCall"))) {
    		eventObject["videoCall"] = videoCall;
    	}
    	if (description || (editEvent && originalEvent.hasOwnProperty("description"))) {
    		eventObject["description"] = description;
    	}
		*/
		
    	if (isRepeat || (editEvent && originalEvent.hasOwnProperty("isRepeat"))) {
    		eventObject["isRepeat"] = isRepeat;
    		eventObject["repeat"] = repeat;
    	}
    	
    	if (notifications && notifications.length > 0 || (editEvent && originalEvent.hasOwnProperty("notifications"))) {
    		eventObject["notifications"] = notifications;
    	}
    	
    	if (guests && guests.length >= 0 || (editEvent && originalEvent.hasOwnProperty("guests"))) {
    		eventObject["guests"] = guests;
    	}
		//*************

	    // Create new event
	    if (!editEvent) {   
	    	eventList.push(eventObject);
	    }
	    else { // Edit current event
	    	if (isLoggedInUserInvitedToAttendThisEvent) {
	    		var attendEventValue = $("input[name='attendEvent']:checked").val();
	    		if (attendEventValue) {
		    		var currentEventGuest = getGuestObjectOnEvent(eventObject, emailAccount);
		    		currentEventGuest.attendEvent = attendEventValue;
	    		}
	    	}
	    	
			eventList[index] = eventObject;
	    }
	
	    storeItem("events", eventList, true);

		var goBack = function () {
			onBackBtnClick(true);
		};
		
    	if (tempGuests && tempGuests.length > 0) {
    		showDialog("أرسال دعوات", "هل ترغب في توجيه دعوات إلى المدعوين؟", [ { label: "إرسال", callback: goBack }, { label: "عدم إرسال", callback: goBack } ], { "font-size": "13px" });
    	}
    	else {
    		goBack();
    	}
    } 
    else {
    	showDialog("تنبيه", "يجب إدخال اسم للحدث", [ { label: "موافق" } ]);
    }
};
//___________________________________________________

var onRepeatButtonClick = function () {
    hideRepeatEventPopup();
    
    var checkBox = $('#repeatInp')[0];
    if (checkBox.checked) {
        var repeatEventPopup = $("#repeat-event-popup");
        $('#repeat-event-popup-start-on').val($('#fromDateInp').val());

        // Calculate popup position
        var left = (0.5 * (window.outerWidth - 300)) + "px";
        var top = (0.28 * (window.outerHeight - 150)) + "px";

        repeatEventPopup.css({ "left": left, "top": top, "display": "block" });
        repeattypeChangeCallBack();

    }
    else {
        tempRepeat = {};
        $('#repeatLabel').html('Repeat...');
    }
};
//___________________________________________________

var hideRepeatEventPopup = function () {
    $("#repeat-event-popup").css({ "display": "none" });
};
//___________________________________________________

var closeRepeatEventPopup = function () {
    hideRepeatEventPopup();
    if ($.isEmptyObject(tempRepeat)) {
        $('#repeatInp')[0].checked = false;
    }
};
//___________________________________________________

var repeattypeChangeCallBack = function () {
    var selectedValue = $('#repeat-event-popup-repeats').val();
    $('.repeat-hidden-option').css('display', 'none');
    $('#summery-content').html($("#repeat-event-popup-repeats option:selected").text());
    switch (selectedValue) {
        case '0': {
            $('#repeat-every-tr').css('display', '');
            $('#repeat-every-type').html('days');
            break;
        }
        case '1': {
            break;
        }
        case '2': {
            break;
        }
        case '3': {
            break;
        }
        case '4': {
            $('#repeat-every-tr').css('display', '');
            $('#repeat-on-tr').css('display', '');
            $('#repeat-every-type').html('weeks');
            break;
        }
        case '5': {
            $('#repeat-every-tr').css('display', '');
            $('#repeat-by-tr').css('display', '');
            $('#repeat-every-type').html('months');
            break;
        }
        case '6': {
            $('#repeat-every-tr').css('display', '');
            $('#repeat-every-type').html('years');
            break;
        }
    }
};
//___________________________________________________

var doneRepeatEventPopup = function () {
    var repeatInputs = $('#repeat-event-popup-table input').add($('#repeat-event-popup-table select'));

    for (var i = 0 ; i < repeatInputs.length; i++) {
        var inp = $(repeatInputs[i]);
        tempRepeat[inp.attr('name')] = inp.val();
    }
    hideRepeatEventPopup();

    $('#repeatLabel').html('Repeat:' + $("#repeat-event-popup-repeats option:selected").text() + '  ').append($('<a>Edit</a>').click(onRepeatButtonClick));
};
//___________________________________________________

$('body').ready(function () {
    $('input[name="endson"]').click(function () {
        $('.disabled-options').attr('disabled', 'disabled');

        var selectors = $('input[name="endson"]');
        for (var i = 0 ; i < selectors.length; i++) {
            if (selectors[i].checked) {
                var title = $(selectors[i]).attr('title');
            }
        }

        if (title) {
            if (title == 'Ends after a number of occurrences') {
                $('#after-text-box').val('35').removeAttr('disabled');
            }
            else if (title == 'Ends on a specified date') {
                $('#on-text-box').removeAttr('disabled');
            }
        }
    });
});
//___________________________________________________







