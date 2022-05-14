
var weekDay = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

var monthString = ["يناير ", "فبراير ", "مارس ", "أبريل ", "مايو ", "يونيو ", "يوليو ", "أغسطس ", "سبتمبر ", "أكتوبر ", "نوفمبر ", "ديسمبر"];
var fullMonthString = ["يناير ", "فبراير ", "مارس ", "أبريل ", "مايو ", "يونيو ", "يوليو ", "أغسطس ", "سبتمبر ", "أكتوبر ", "نوفمبر ", "ديسمبر"];

var emailAccount = getItem("emailAccount");

var selectedCalendar;
var defaultCalendar = "week";

var weekDatesObjects = [{}, {}, {}, {}, {}, {}, {}];

var calendars = [];
var calendarName2Color = {};

var events = [];

var defaultDate = {};

var colorsExtended = $.extend([], colors);

//_________________________________________

var showHideGoogleApps = function () {
    $('#googleApps').toggle();
};
//_________________________________________

var createColorsExtendedFromCalendars = function () {
    if (calendars && calendars.length > 0) {
        for (var i = 0; i < calendars.length; i++) {
            if (calendars[i].color) {
                for (j = colorsExtended.length - 1; j >= 0; j--) {
                    if (calendars[i].color.bgColor == colorsExtended[j].bgColor) {
                        colorsExtended.splice(j, 1);
                        break;
                    }
                }
            }
        }
    }
};
//_________________________________________

var generateCalendarColor = function () {
    var r = Math.floor(Math.random() * colorsExtended.length);
    var generatedColor = $.extend({}, colorsExtended[r]);
    colorsExtended.splice(r, 1);
    return generatedColor;
};
//_________________________________________

var stopPropagation = function (e) {
    // Don't propogate the event to the document
    e = e || window.event;
    if (e.stopPropagation) {
        e.stopPropagation();   // W3C model
    }
    else {
        e.cancelBubble = true; // IE model
    }
};
//___________________________________________________________________________________________________________________________
//*************************************************** Load and Fill Items ***************************************************

var loadItemsFromCache = function () {
    createColorsExtendedFromCalendars();

    removeItem("editEvent");
    removeItem("editCalendar");

    //Selected Calendar
    selectedCalendar = getItem("selectedCalendar");
    if (!selectedCalendar) {
        selectedCalendar = defaultCalendar;
        storeItem(selectedCalendar);
    }

    //Cached Calendars
    calendars = getItem("calendars", true);
    for (var i = 0; i < calendars.length; i++) {
        calendars[i].color = calendars[i].color || generateCalendarColor();
        calendarName2Color[calendars[i].name] = calendars[i].color;
    }
    storeItem("calendars", calendars, true);

    //Cached Events
    events = getItem("events", true);
    for (var i = 0; i < events.length; i++) {
        events[i].bgColor = calendarName2Color[events[i].calendarName].eventBgColor;
        events[i].borderColor = calendarName2Color[events[i].calendarName].eventBorderColor;

        events[i].fromDateObject = createDateObjectFromDateString(events[i].fromDate);
        events[i].toDateObject = createDateObjectFromDateString(events[i].toDate);

        events[i].fromTimeObject = createTimeObjectFromTimeString(events[i].fromTime);
        events[i].toTimeObject = createTimeObjectFromTimeString(events[i].toTime);
    }

    //Cached Default Date
    defaultDate = getItem("defaultDate", true);
};
//_________________________________________

var FillInputsWithValues = function () {
    //Fill Calendar List
    var calendarList = $("#calendarList");
    for (var i = 0; i < calendars.length; i++) {
        var isHide = calendars[i].isHide && calendars[i].isHide == "true" ? true : false;
        if (!isHide) {
            var calendarContainer = $("<div class='calendarContainer'>");
            calendarContainer.attr("id", calendars[i].name);

            calendarContainer.hover(function () {
                $(this).find(".calendarNavSettings").show();
            }, function () {
                $(this).find(".calendarNavSettings").hide();
            });

            calendarContainer.click(function () {
                calendarContainer.hover();
            });

            var container = $("<div>").css({ "height": "13px;", "vertical-align": "middle", "position": "relative", "top": "2px" });

            var colorDiv = $("<div class='calendarColorDiv'>");
            colorDiv.css({ "background": calendars[i].color.bgColor });

            var calendarTitle = $("<span class='calendarTitle'>").append(calendars[i].name);

            var calendarMenu = $('<img class="calendarNavSettings" src="./تقويم جوجل_files/arrowDown.png" alt="" style="display: none;" />');
            calendarMenu.on("click", showCalendarMenu);

            container.append(colorDiv).append(calendarTitle).append(calendarMenu);
            calendarContainer.append(container);
            calendarList.append(calendarContainer);
        }
    }

    //Create calendar dropsown list for create event popup
    var calendarListContainer = $("#create-event-popup-calendar-list");
    var select = createCalendarDropdownList(calendars);
    $(select).css({ "width": "100%" });
    calendarListContainer.append(select);
};
//___________________________________________________________________________________________________________________________
//************************************************** Create Full Calendar ***************************************************

var createEventObject = function (title, fromDate, fromTime, toDate, toTime) {
    return {
        title: title,
        start: fromDate + "T" + fromTime,
        end: toDate + "T" + toTime,
        eventObject: e
    };
};
//_________________________________________

var getAllEventsObject = function () {
    var eventsObjects = [];

    for (var i = 0; i < events.length; i++) {
        var e = events[i];
        var fromDate = e.fromDateObject.year + "-" + e.fromDateObject.month + "-" + e.fromDateObject.day;
        var fromTime = e.fromTimeObject.hour + ":" + e.fromTimeObject.minute + ":" + "00";
        var toDate = e.toDateObject.year + "-" + e.toDateObject.month + "-" + e.toDateObject.day;
        var toTime = e.toTimeObject.hour + ":" + e.toTimeObject.minute + ":" + "00";

        eventsObjects.push({ title: e.name, start: fromDate + "T" + fromTime, end: toDate + "T" + toTime, eventObject: e });
    }

    return eventsObjects;
};
//_________________________________________

var createFullCalendar = function () {
    $('#calendar').fullCalendar({
       //isRTL: true,
        locale: "ar-sa",
        header: {
            left: 'today prev,next',
            center: 'title',
            right: 'agendaDay,agendaWeek,month,أيام4,أجنده,المزيد,settings'
        },
        defaultDate: defaultDate.year + "-" + defaultDate.month + "-" + defaultDate.day, 	 //'2016-01-12'//
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        onCalendarChangeCallback: function (button) {
            var btnClass = $(button).attr("class").toLowerCase();
            if (btnClass.indexOf("day")>-1) {
                selectedCalendar = "day";
            }
            else if (btnClass.indexOf("week")>-1) {
                selectedCalendar = "week";
            }
            else if (btnClass.indexOf("month")>-1) {
                selectedCalendar = "month";
            }

            hideAllPopupsAndMenus();

            //selectedCalendar = button[0].textContent.trim();
            if (selectedCalendar) {
                storeItem("selectedCalendar", selectedCalendar);
            }
        },
        onEventClickCallback: showEventPopup,
        onEventTitleClickCallback: editEvent,
        onEventChangeCallback: function () {
            storeItem("events", events, true);
        },
        onCellClickCallback: showCreateEventPopup,
        events: getAllEventsObject()
    });

    //$('#calendar').fullCalendar('option', 'locale', "ar-ma");
    editOnCalendarElements();

    if (selectedCalendar) {
        window.calendarButtons[selectedCalendar].click();
    }

    //****************** HACK ******************
    // There is a bug when render week calendar for the first time, 
    // the events is rendered with a wrong time size and on the wrong block
    // so to solve this problem re-render the week calendar.
    if (selectedCalendar == "week") {
        window.calendarButtons["week"].click();
    }
    //******************************************


    $('html').click(function () {
        hideAllPopupsAndMenus();
    });

    var settingsButton = $("#settingsButton");
    if (settingsButton) {
        settingsButton.on("click", showSettingsMenu);
    }
};
//_________________________________________

var hideAllPopups = function () {
    hideQuickAddEvent();
    hideEventPopup();
    hideCreateEventPopup();
    hideCalendarsMenu();
    hideCalendarMenu();
    hideSettingsMenu();
};

//_________________________________________

var hideAllPopupsAndMenus = function () {
    hideAllPopups();
    hideCalendarsMenu();
    hideCalendarMenu();
    hideSettingsMenu();
};
//_________________________________________

var editOnCalendarElements = function () {
    var settingButton = $(".fc-settings-button");
    settingButton.attr("id", "settingsButton");
    settingButton.removeClass("disabled-button");
    settingButton.addClass("fc-button");
    settingButton.addClass("fc-state-default");
    settingButton.val("");
    settingButton[0].innerHTML = '&nbsp;<img src="../img/settings.png" alt="" />';
};
//_________________________________________

var showSettingsMenu = function (e) {
    stopPropagation(e);

    var settingsMenu = $("#settingsMenu");
    if (settingsMenu.css("display") == "none") {
        //**** jQuery Fix event ****//
        var e = jQuery.event.fix(event);

        var left = $(this).offset().left;
        var top = $(this).offset().top;
        var height = $(this).height();
        var menueWidth = settingsMenu.width();
        settingsMenu.css({ display: "block", left: left - (menueWidth / 2), top: top + height });
    }
    else {
        hideSettingsMenu();
    }
};
//_________________________________________

var hideSettingsMenu = function () {
    var settingsMenu = $("#settingsMenu");
    settingsMenu.css({ display: "none" });
};
//_________________________________________

var onSettingsClick = function () {
    storeItem("isGeneralSettings", "true");
    window.open("calendarsSettings.html", "_self");
};
//___________________________________________________________________________________________________________________________
//******************************************** Create Event Button and Quick Add ********************************************

var onCreateEventBtnClick = function () {
    window.location = "event.html";
};
//_________________________________________

var hideQuickAddEvent = function () {
    $("#quickAddEventDiv").css("visibility", "hidden");
    $("#quickAddEventInp").val("");
};
//_________________________________________

var showHideQuickAddEvent = function () {
    stopPropagation();

    var quickAddDiv = $("#quickAddEventDiv");
    var visibility = quickAddDiv.css("visibility");
    if (visibility == "hidden") {
        hideAllPopupsAndMenus();
        quickAddDiv.css("visibility", "visible");
    }
    else {
        hideQuickAddEvent();
    }
};
//_________________________________________

var onQuickAddEventBtnClick = function () {
    var eventTitle = $("#quickAddEventInp").val().trim();
    if (eventTitle) {
        $("#quickAddEventInp").val("");
        storeItem("createEventByTitle", eventTitle);
        window.location = "event.html";
    }
};
//___________________________________________________________________________________________________________________________
//************************************* Create Mini Calendars and My Calendars Section **************************************

var showCalendarsMenu = function (e) {
    stopPropagation(e);

    var calendarsMenu = $("#calendarsMenu");
    if (calendarsMenu.css("display") == "none") {
        calendarsMenu.show();
    }
    else {
        hideCalendarsMenu();
    }
};
//_________________________________________

var hideCalendarsMenu = function () {
    $("#calendarsMenu").hide();
};
//_________________________________________

var onMiniCalendarNavClick = function (sender) {
    var miniCalendarContent = $("#miniCalendarContent");
    var arrow = $(sender).find(".calendarNavRightArrow");

    if (miniCalendarContent.css("display") == "none") {
        miniCalendarContent.show();
        arrow.attr("src", "../img/arrowDown.png");
    }
    else {
        miniCalendarContent.hide();
        arrow.attr("src", "../img/arrowRight.png");
    }
};
//_________________________________________

var onMyCalendarNavClick = function (sender) {
    var myCalendarContent = $("#myCalendarsContent");
    var arrow = $(sender).find(".calendarNavRightArrow");

    if (myCalendarContent.css("display") == "none") {
        myCalendarContent.show();
        arrow.attr("src", "../img/arrowDown.png");
    }
    else {
        myCalendarContent.hide();
        arrow.attr("src", "../img/arrowRight.png");
    }
};
//_________________________________________

var openCreateNewCalendarPage = function (e) {
    stopPropagation(e);
    window.open("newCalendar.html", "_self");
};
//_________________________________________

var openSettingsPage = function (e) {
    stopPropagation(e);
    window.open("calendarsSettings.html", "_self");
};

//___________________________________________________________________________________________________________________________
//************************************************* Create My Calendar Menu *************************************************

var showCalendarMenu = function (e) {
    stopPropagation(e);

    $(".calendarContainer").removeClass("selected");
    $(".calendarNavSettings").hide();

    var calendarMenu = $("#calendarMenu");

    var currentCalendar = $(this).closest(".calendarContainer")[0];
    var currentCalendarNavSettings = currentCalendar.querySelector(".calendarNavSettings");
    var calendarTitle = $(currentCalendar).attr("id");

    if (calendarMenu.css("display") != "none" && calendarTitle == calendarMenu.attr("calendarName")) {
        calendarMenu.hide();
    }
    else {
        $(currentCalendar).addClass("selected");
        $(currentCalendarNavSettings).show();

        calendarMenu.attr("calendarName", calendarTitle);
        calendarMenu.css({ "top": $(currentCalendar).offset().top - $(window).scrollTop() - 100 });
        calendarMenu.show();

        calendarMenu.off("mouseover").on("mouseover", function () {
            $(currentCalendar.querySelector(".calendarNavSettings")).show();
        });
    }
};
//_________________________________________

var hideCalendarMenu = function () {
    $("#calendarMenu").hide();
    $("#calendarMenu").attr("calendarName", "");
    $(".calendarContainer").removeClass("selected");
    $(".calendarNavSettings").hide();
};
//_________________________________________

var getCalendarByName = function (calendarName) {
    var calendarData = {};

    for (var i = 0; i < calendars.length; i++) {
        if (calendars[i].name == calendarName) {
            calendarData.calendar = calendars[i];
            calendarData.index = i;
            break;
        }
    }

    return calendarData;
};
//_____________________________________________

var onHideCalendarClick = function () {
    var calendarName = $("#calendarMenu").attr("calendarName");

    var calendarData = getCalendarByName(calendarName);
    if (calendarData.calendar) {
        calendarData.calendar.isHide = "true";
        storeItem("calendars", calendars, true);

        $(".calendarContainer.selected").remove();
    }
};
//_________________________________________

var onEditCalendarClick = function () {
    var calendarName = $("#calendarMenu").attr("calendarName");

    var calendarData = getCalendarByName(calendarName);
    if (calendarData.calendar) {
        storeItem("editCalendar", calendarData.calendar, true);
        window.location = "editCalendar.html";
    }
};
//_________________________________________

var onCreateEventOnCalendarClick = function () {
    var calendarName = $("#calendarMenu").attr("calendarName");
    storeItem("createEventOnCalendar", calendarName);
    window.location = "event.html";
};
//_________________________________________

var onShareCalendarClick = function () {
    storeItem("shareCalendar", "true");
    onEditCalendarClick();
};
//___________________________________________________________________________________________________________________________
//************************************************** Event Shared Methods ***************************************************

var getPopupDateString = function (year, month, day, fromTime, toTime) {
    year = convertArabicNumbertoEnglish(year);
    month = convertArabicNumbertoEnglish(month);
    day = convertArabicNumbertoEnglish(day);
    var date = new Date(year, parseInt(month) - 1, day);

    var dateTimeString = weekDay[date.getDay()] + ", " + fullMonthString[date.getMonth()] + " " + date.getDate();

    if (fromTime && toTime) {
        dateTimeString += ", " + fromTime + " - " + toTime;
    }

    return dateTimeString;
};
//_________________________________________

var hideCreateEventPopup = function () {
    document.getElementById("create-event-popup-what").textContent = "";

    $("#create-event-popup").css({ "display": "none" });
};
//_________________________________________

var hideEventPopup = function () {
    var eventPopup = $("#event-popup");

    document.getElementById("event-popup-title").textContent = "";
    document.getElementById("event-popup-date-time").textContent = "";

    $("#event-popup-table").children().remove();
    $("#event-popup-footer-right").children().remove();
    $("#event-popup-footer-left").children().remove();

    eventPopup.css({ "display": "none" });
};
//_________________________________________

var editEvent = function (element, elementEvent) {
    element = element || event.data.element;
    elementEvent = elementEvent || event.data.elementEvent;

    var currentEvent = elementEvent.eventObject;
    storeItem("editEvent", currentEvent, true);
    window.location = "event.html";
};
//___________________________________________________________________________________________________________________________
//**************************************************** Exist Event Popup ****************************************************

var showEventPopup = function (element, elementEvent) {
    hideAllPopupsAndMenus();

    var eventObject = elementEvent.eventObject;
    var eventPopup = $("#event-popup");

    eventPopup.on("click", function (e) {
        stopPropagation(e);
    });

    var eventTitle = document.getElementById("event-popup-title");
    var eventDateTime = document.getElementById("event-popup-date-time");
    var eventTable = document.getElementById("event-popup-table");

    // if the event popup is dirty with the same values of the clecked event so hide it and clear it's values otherwise show it with new values
    if (eventObject.name == eventTitle.textContent &&
			eventObject.fromDate == eventDateTime.fromDate && eventObject.fromTime == eventDateTime.fromTime &&
			eventObject.toDate == eventDateTime.toDate && eventObject.toTime == eventDateTime.toTime) {
        eventPopup.css({ "display": "none" });

        eventDateTime.fromDate = "";
        eventDateTime.fromTime = "";
        eventDateTime.toDate = "";
        eventDateTime.toTime = "";
    }
    else {
        eventTitle.textContent = eventObject.name;
        $(eventTitle).css({ color: eventObject.borderColor });

        var splittedDate = eventObject.fromDate.split("/");
        var fromTime = createTimeStringFromTimeObject(eventObject.fromTimeObject);
        var toTime = createTimeStringFromTimeObject(eventObject.toTimeObject);

        eventDateTime.textContent = getPopupDateString(splittedDate[2], splittedDate[1], splittedDate[0], fromTime, toTime);
        eventDateTime.fromDate = eventObject.fromDate;
        eventDateTime.fromTime = eventObject.fromTime;
        eventDateTime.toDate = eventObject.toDate;
        eventDateTime.toTime = eventObject.toTime;

        // Where
        if (eventObject.where) {
            var row = document.createElement("tr");
            row.innerHTML = "<th>المكان</th><td>" + eventObject.where + "</td>";
            eventTable.appendChild(row);
        }
        // Video Call
        if (eventObject.videoCall == "true") {
            var row = document.createElement("tr");
            row.innerHTML = '<th>مكالمة فيديو</th><td><img src="../img/videoCall.png" alt="" style="margin-right: 5px;" /><span class="spanLink">Join meeting</span><br /></td>';
            eventTable.appendChild(row);
        }
        // Calendar Name
        if (eventObject.calendarName) {
            var row = document.createElement("tr");
            row.innerHTML = "<th>التقويم</th><td>" + eventObject.calendarName + "</td>";
            eventTable.appendChild(row);
        }
        // Created By
        if (eventObject.createdBy) {
            var row = document.createElement("tr");
            row.innerHTML = "<th>تم إنشاؤه بواسطة</th><td>" + eventObject.createdBy + "</td>";
            eventTable.appendChild(row);
        }
        // Who
        if (eventObject.guests && eventObject.guests.length > 0) {
            var guestEmailList = [];
            for (var i = 0; i < eventObject.guests.length; i++) {
                guestEmailList.push(eventObject.guests[i].email);
            }

            var row = document.createElement("tr");
            row.innerHTML = "<th>الحضور</th><td><span style='color: gray;'>" + guestEmailList.join(', ') + "</span></td>";
            eventTable.appendChild(row);
        }

        // Footer links
        createEventPopupFooterSection(element, elementEvent);

        //**** jquery Fix event ****//
        var e = jQuery.event.fix(event);

        // Calculate popup position
        var pageX = e.pageX;
        var pageY = e.pageY;

        var w = eventPopup.width();
        var h = eventPopup.height();

        var left = pageX - 200;
        var top = pageY - $(window).scrollTop() - h - 10;

        eventPopup.css({ "left": left, "top": top, "display": "block" });
    }
};
//_________________________________________

var createEventPopupFooterSection = function (element, elementEvent) {
    var eventObject = elementEvent.eventObject;

    var rightFooter = $("#event-popup-footer-right");
    var leftFooter = $("#event-popup-footer-left");

    // Right Footer Section
    var rightFooterContainer = $("<span>");
    rightFooter.append(rightFooterContainer);
    if (!eventObject.createdBy || (eventObject.createdBy && eventObject.guestPermissions.canModifyEvent == "true")) {
        var editEvent = $("<span class='spanLink'>").append("تعديل الحدث »");
        editEvent.on("click", { element: element, elementEvent: elementEvent }, showEditEvent);
        rightFooterContainer.append(editEvent);
    }
    else {
        var moreDetails = $("<span class='spanLink'>").append("المزيد من التفاصيل »");
        moreDetails.on("click", { element: element, elementEvent: elementEvent }, showEventDetails);
        rightFooterContainer.append(moreDetails);
    }

    // Left Footer Section
    var leftFooterContainer = $("<span>");
    leftFooter.append(leftFooterContainer);

    var currentEventGuest = getGuestObjectOnEvent(eventObject, emailAccount);
    var isLoggedInUserInvitedToAttendThisEvent = currentEventGuest ? true : false;

    if (isLoggedInUserInvitedToAttendThisEvent) {
        var attendEventTitle = $("<span>").append("هل ستشارك؟").css({ "font-weight": "bold", "margin-right": "5px" });

        var yes = $("<span class='spanLink'>").append("نعم");
        if (currentEventGuest.attendEvent.toLowerCase() == "yes") {
            yes.addClass("attendedEvent");
        }
        else {
            yes.on("click", { eventGuest: currentEventGuest, attendValue: "yes" }, attendEvent);
        }

        var maybe = $("<span class='spanLink'>").append("ربما");
        if (currentEventGuest.attendEvent.toLowerCase() == "maybe") {
            maybe.addClass("attendedEvent");
        }
        else {
            maybe.on("click", { eventGuest: currentEventGuest, attendValue: "maybe" }, attendEvent);
        }

        var no = $("<span class='spanLink'>").append("لا");
        if (currentEventGuest.attendEvent.toLowerCase() == "no") {
            no.addClass("attendedEvent");
        }
        else {
            no.on("click", { eventGuest: currentEventGuest, attendValue: "no" }, attendEvent);
        }

        var remove = $("<span class='spanLink'>").append("حذف").on("click", { element: element, elementEvent: elementEvent, isRemove: true }, onDeleteEventClick);

        leftFooterContainer.append(attendEventTitle).append(yes).append(" - ").append(maybe).append(" - ").append(no).append(" | ").append(remove);
    }
    else {
        var deleteLink = $("<span class='spanLink'>").append("حذف").on("click", { element: element, elementEvent: elementEvent }, onDeleteEventClick);
        leftFooterContainer.append(deleteLink);
    }
};
//_________________________________________

var attendEvent = function (dataObject) {
    dataObject.data.eventGuest.attendEvent = dataObject.data.attendValue;

    storeItem("events", events, true);

    hideEventPopup();
};
//_________________________________________

var onDeleteEventClick = function (event) {
    var element = event.data.element;
    var elementEvent = event.data.elementEvent;
    var isRemove = event.data.isRemove;

    var deleteEvent = function () {
        var index = -1;
        for (var i = 0; i < events.length; i++) {
            if (events[i] == elementEvent.eventObject) {
                index = i;
                break;
            }
        }

        if (index > -1) {
            events.splice(index, 1);
            window.calendarOptions.events.splice(index, 1);
            window.calendarOptions.fullCalendarCreatedEvents.splice(index, 1);
            $(element).remove();
        }

        storeItem("events", events, true);
    };

    var dialogTitle = isRemove ? "إزالة الحدث" : "حذف الحدث";
    var dialogMsg = isRemove ? "هل أنت متأكد أنك تريد إزالة هذا الحدث؟" : "هل أنت متأكد أنك تريد حذف هذا الحدث؟"
    showDialog(dialogTitle, dialogMsg, [{ label: "نعم", callback: deleteEvent }, { label: "لا" }]);

    hideEventPopup();
};
//_________________________________________

var showEditEvent = function (event) {
    var element = event.data.element;
    var elementEvent = event.data.elementEvent;

    editEvent(element, elementEvent);
};
//_________________________________________

var showEventDetails = function (event) {
    var element = event.data.element;
    var elementEvent = event.data.elementEvent;

    var currentEvent = elementEvent.eventObject;
    storeItem("editEvent", currentEvent, true);
    window.location = "event.html";
};
//___________________________________________________________________________________________________________________________
//**************************************************** Create Event Popup ***************************************************

var showCreateEventPopup = function (element) {
    hideAllPopupsAndMenus();

    var currentDate = $(element).attr("date");
    var fromTime = $(element).attr("time") || "";
    var toTime = "";
    if (fromTime) {
        toTime = expandTimeOneHour(fromTime);
    }

    var createEventPopup = $("#create-event-popup");
    createEventPopup.on("click", function (e) {
        stopPropagation(e);
    });

    var whenEvent = document.getElementById("create-event-popup-when");

    if (currentDate == whenEvent.date && fromTime == whenEvent.fromTime && toTime == whenEvent.toTime) {
        whenEvent.date = "";
    }
    else {
        var splittedDate = currentDate.split("/");

        whenEvent.textContent = getPopupDateString(splittedDate[2], splittedDate[1], splittedDate[0], fromTime, toTime);
        whenEvent.date = currentDate;
        whenEvent.fromTime = fromTime;
        whenEvent.toTime = toTime;

        //**** jquery Fix event ****//
        var e = jQuery.event.fix(event);

        // Calculate popup position
        var pageX = e.pageX;
        var pageY = e.pageY;

        var w = createEventPopup.width();
        var h = createEventPopup.height();

        var left = pageX - 200;
        var top = pageY - $(window).scrollTop() - h - 10;

        createEventPopup.css({ "left": left, "top": top, "display": "block" });
    }
};
//_________________________________________

var expandTimeOneHour = function (fromTime) {
    fromTime = fromTime;
    //fromTime = convertArabicNumbertoEnglish(fromTime);
    var fromTimeObject = createTimeObjectFromTimeString(fromTime);
    var toTimeObject = $.extend({}, fromTimeObject);
    toTimeObject.hour = convertArabicNumbertoEnglish(toTimeObject.hour);
    toTimeObject.minute = convertArabicNumbertoEnglish(toTimeObject.minute);
    var nextHour = parseInt(toTimeObject.hour) + 1;
    nextHour = (nextHour == 24 ? 0 : nextHour).toString();
    toTimeObject.hour = nextHour.length == 1 ? "0" + nextHour : nextHour;
    var toTime = createTimeStringFromTimeObject(toTimeObject);

    return toTime;
};
//_________________________________________

var createBasicEventObject = function (title, fromDate, fromTime, toDate, toTime, calendarName) {
    return {
        name: title || "",
        fromDate: fromDate || "",
        toDate: toDate || "",
        fromTime: fromTime || "12:00pm",
        toTime: toTime || "01:00pm",
        calendarName: calendarName
    };
};
//_________________________________________

var onCreateEventPopupButtonClick = function () {
    var createEventPopup = $("#create-event-popup");
    var eventTitle = document.getElementById("create-event-popup-what");

    if (!eventTitle.value) {
        showDialog("", "يرجى وضع عنوان الحدث", [{ label: "OK" }]);
    }
    else {
        var eventDateTime = document.getElementById("create-event-popup-when");
        var calendarName = document.getElementById("calendarNameInp");

        var eventObject = createBasicEventObject(eventTitle.value, eventDateTime.date, eventDateTime.fromTime, eventDateTime.date, eventDateTime.toTime, calendarName.value);
        events.push(eventObject);
        storeItem("events", events, true);

        hideCreateEventPopup();
        location.reload();
    }
};
