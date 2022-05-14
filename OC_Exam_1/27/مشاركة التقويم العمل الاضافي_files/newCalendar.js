var tempShare = [];

//_____________________________________________

var onBackBtnClick = function () {
  var calendarName = document.getElementById("calendarName").value;
  var calendarDescription = document.getElementById(
    "calendarDescription"
  ).value;
  var calendarLocation = document.getElementById("calendarLocation").value;

  var backPage = function () {
    window.history.back();
  };

  if (!calendarName && !calendarDescription && !calendarLocation) {
    backPage();
  } else {
    showDialog("إلغاء", "هل أنت متأكد أنك تريد تجاهل هذا التقويم الجديد؟", [
      { label: "نعم", callback: backPage },
      { label: "لا" },
    ]);
  }
};
//_____________________________________________

var createSharePermissionDropdown = function () {
  var select = $('<select class="sharePermission">');
  select.append(
    '<option value="Make changes AND manage sharing">إجراء التغييرات وإدارة المشاركة</option>'
  );
  select.append(
    '<option value="Make changes to events">إجراء تغييرات على الأحداث</option>'
  );
  select.append(
    '<option value="See all event details">عرض كافة تفاصيل الحدث</option>'
  );
  select.append(
    '<option value="See only free/busy (hide details)">عرض حالتي موجود/مشغول فقط (إخفاء التفاصيل)</option>'
  );

  return select;
};
//_____________________________________________

var appendEmailRow = function (shareEmail, sharePermissionValue) {
  var sharePermissionDropdown = createSharePermissionDropdown();

  sharePermissionDropdown.val(sharePermissionValue);

  var row = $("<tr>");
  var shareEmailTd = $("<td class='emailAddress'>").append(shareEmail);
  var sharePermissionTd = $("<td>").append(sharePermissionDropdown);
  var removeShareTd = $("<td>").append(
    "<img class='removeShare' src='../img/icon_delete.gif' alt='' onclick='onRemoveSahredPersonClick(this);' />"
  );

  row.append(shareEmailTd).append(sharePermissionTd).append(removeShareTd);
  $("#shareCalendarFormTable").append(row);

  sharePermissionDropdown.on("change", function () {
    var currentPermissionValue = $(this).val();
    var currentEmail = shareEmailTd.text();

    for (var i = 0; tempShare.length; i++) {
      if (currentEmail == tempShare[i].email) {
        tempShare[i].permission = currentPermissionValue;
        break;
      }
    }
  });
};
//_____________________________________________

var onAddPersonBtnClick = function () {
  var shareCalendarTemplate = document.getElementById("shareCalendarTemplate");

  var shareEmailInputField = shareCalendarTemplate.querySelector("#shareEmail");
  var shareEmail = shareEmailInputField.value.trim().toLowerCase();
  if (shareEmail) {
    var isEmailFound = false;
    for (var i = 0; i < tempShare.length; i++) {
      if (tempShare[i].email == shareEmail) {
        isEmailFound = true;
        break;
      }
    }

    if (!isEmailFound) {
      var sharePermission =
        shareCalendarTemplate.querySelector(".sharePermission");

      appendEmailRow(shareEmail, sharePermission.value);

      tempShare.push({ email: shareEmail, permission: sharePermission.value });

      if (
        !localStorage.getItem("20") &&
        shareEmail == "eng.hassan@specto.com" &&
        sharePermission.value == "Make changes to events"
      ) {
        localStorage.setItem("20", 1);
        alert("تمت المشاركة بنجاح");
      } else {
        localStorage.setItem("20", 0);
        let wrong = JSON.parse(localStorage.getItem("wrongAnswers"));
        let q20 = {
          id: 20,
          q: "20 - قم بمشاركة التقويم العمل الإضافي مع eng.hassan@specto.com بحيث يمكن إجراء تغييرات على الأحداث.",
        };
        wrong.push(q20);
        localStorage.setItem("wrongAnswers", JSON.stringify(wrong));
      }

      shareEmailInputField.value = "";
    }
  }
};
//_____________________________________________

var onRemoveSahredPersonClick = function (sender) {
  var currentRow = $(sender).closest("tr");
  var emailAddressToRemove = currentRow
    .find(".emailAddress")[0]
    .textContent.trim()
    .toLowerCase();

  var index = -1;
  for (var i = 0; i < tempShare.length; i++) {
    if (tempShare[i].email == emailAddressToRemove) {
      index = i;
      break;
    }
  }

  tempShare.splice(index, 1);
  currentRow.remove();
};
//___________________________________________

var getFormValues = function () {
  var calendar = null;

  var calendarName = document.getElementById("calendarName").value;

  if (!calendarName) {
    showDialog("خطأ في الإعدادات", "عذرا، لا يمكنك إنشاء تقويم بدون اسم", [
      { label: "OK" },
    ]);
  } else {
    var calendarDescription = document.getElementById(
      "calendarDescription"
    ).value;
    var calendarLocation = document.getElementById("calendarLocation").value;

    calendar = {
      name: calendarName,
      description: calendarDescription,
      location: calendarLocation,
      share: tempShare,
    };
  }

  return calendar;
};
//_____________________________________________

var onCreateCalendarBtnClick = function () {
  var calendar = getFormValues();

  if (calendar) {
    var calendars = getItem("calendars", true);
    calendars.push(calendar);

    storeItem("calendars", calendars, true);

    window.history.back();
  }
};
//_____________________________________________

var createNewCalendarTabs = function () {
  var tabs = [
    {
      tabName: "تفاصيل التقويم",
      tabContentID: "createCalendarContainer",
      isSelected: true,
    },
  ];
  var mainDiv = document.getElementById("mainDiv");
  mainDiv.appendChild(createTabs(tabs));
};
//_________________________________________________________________________________________________________________________

var loadValues = function (editCalendar) {
  document.getElementById("calendarName").value = editCalendar.name;
  document.getElementById("calendarDescription").value =
    editCalendar.description;
  document.getElementById("calendarLocation").value = editCalendar.location;

  if (tempShare && tempShare.length > 0) {
    for (var i = 0; i < tempShare.length; i++) {
      appendEmailRow(tempShare[i].email, tempShare[i].permission);
    }
  }
};
//_____________________________________________

var createEditCalendarTabs = function () {
  var isShareCalendarSelected =
    getItem("shareCalendar") == "true" ? true : false;
  var editCalendar = getItem("editCalendar", true);
  tempShare = editCalendar.share;

  document.getElementById("sectionTitle").textContent =
    " تفاصيل" + " " + editCalendar.name;

  var tabs = [
    {
      tabName: "تفاصيل التقويم",
      tabContentID: "editCalendarContainer",
      isSelected: !isShareCalendarSelected,
    },
    {
      tabName: "مشاركة هذا التقويم",
      tabContentID: "shareCalendarContainer",
      isSelected: isShareCalendarSelected,
    },
  ];
  var mainDiv = document.getElementById("mainDiv");
  mainDiv.appendChild(createTabs(tabs));

  loadValues(editCalendar);

  if (isShareCalendarSelected) {
    removeItem("shareCalendar");
  }
};
//_____________________________________________

var onSaveEditBtnClick = function () {
  var calendar = getFormValues();

  var calendars = getItem("calendars", true);
  var editCalendar = getItem("editCalendar", true);

  for (var i = 0; i < calendars.length; i++) {
    if (
      calendars[i].name == editCalendar.name &&
      calendars[i].description == editCalendar.description &&
      calendars[i].location == editCalendar.location
    ) {
      calendars[i] = $.extend({}, editCalendar, calendar);
      storeItem("calendars", calendars, true);

      break;
    }
  }

  window.history.back();
};
//_____________________________________________
