	/*
	قواعد ترجمة هذا الملف:
1- اسماء الاعلام يجب توافقها عند التعديل اينما وجدت في الملف
2- تعديل اسماء الاعلام / الاشخاص او البريد الالكتروني يتطلب ربطه بنص الأسئلة
3- تبدأ فقرا ت الترجمة برقم ثم جملة من هنا، أي
//1 من هنا
وتنتهي بنفس الرقم ومن ثم إلى هنا، أي
//1 إلى هنا
4- ترجم ما بين ""
مثال
"Nicolas Scott"
مع مراعات تكرار الاسم نفسه في هذا الملف واينما ذكر في نصوص الأسئلة
	*/
var storeGoogleCalendarData = function () {

	//-----------------------------------------------------
	//****************** Default Info *******************//
	//1 من هنا
	var profileName = "سهام الأحمد";
	var emailAccount = "Seham.alahmad@specto.com";
	//1 الى هنا
	
	var defaultCalendarDate = { day: "17", month: "01", year: "2016" };
	
	//-----------------------------------------------------
	//***************** Calendars Info ******************//
	
	// [ { name:.., description:.., location:.., share: [ { email:.., permission:.. } ], hide: true } ]
	//1 من هنا
	var calendars = [ 
		{ name: "العطل الرسمية", description: "", location: "", share: [] },
		{ name: "الإجازات المرضية", description: "", location: "", share: [] },
		{ name: "العمل الإضافي", description: "", location: "", share: [] },
		{ name: "التدريب", description: "", location: "", share: [] },
		{ name: "عام", description: "", location: "", share: [] }
	 ];
	//1 الى هنا
	//-----------------------------------------------------
	//******************* Events Info *******************//
	 
	/* events:
	   [ 
			{ 
				createdBy:.., name:.., fromDate:.., toDate:.., fromTime:.., toTime:.., isAllDay:.., isRepeat:..,  
				repeat: {},
				where:.., videoCall:.., calendarName:.., description:.., 
				notifications: [ { type:.., reminderNumber:.., reminderType:.. } ],
				guests: [ { email:..., attendEvent: "yes/maybe/no" ], 
				guestPermissions: { canModifyEvent:.., canInviteOthers:.., canSeeGuestList:.. },
			}
	   ]
	*/
	//1 من هنا
	// عدم ترجمة كلمة true / false
	var events = [ 
					{ 
					   	name: "مناقشة عطلة عيد العمال", fromDate: "17/01/2016", toDate: "17/01/2016", fromTime: "10:30ص", toTime: "12:00ص", 
						calendarName: "العطل الرسمية", 
						guestPermissions: { canModifyEvent: "true", canInviteOthers: "true", canSeeGuestList: "true" }
					}, 
					{ 
					   	name: "اجتماع مع موظفي الموارد البشرية", fromDate: "19/01/2016", toDate: "19/01/2016", fromTime: "02:00م", toTime: "04:00م", 
						calendarName: "الإجازات المرضية", 
						guests: [ { email: "jamal.waleed@specto.com", attendEvent: "" }, { email: "diana.maher@specto.com", attendEvent: "" } ], 
						guestPermissions: { canModifyEvent: "true", canInviteOthers: "true", canSeeGuestList: "true" }
					},
					{ 
						name: "مناقشة خطة التدريب", fromDate: "21/01/2016", toDate: "21/01/2016", fromTime: "12:00م", toTime: "01:30م", 
						calendarName: "التدريب", 
						guestPermissions: { canModifyEvent: "true", canInviteOthers: "true", canSeeGuestList: "true" }
					},
					{ 
					   	name: "اجتماع عام", fromDate: "21/01/2016", toDate: "21/01/2016", fromTime: "02:00م", toTime: "03:00م", 
						calendarName: "عام", 
						guestPermissions: { canModifyEvent: "true", canInviteOthers: "true", canSeeGuestList: "true" }
					}, 
				 ];
	//1 الى هنا
	//_____________________________________________________
	createCalendarsColorsObject(calendars);
	
	storeItem("profileName", profileName,false, true);
	storeItem("emailAccount", emailAccount,false, true);
	storeItem("defaultDate", defaultCalendarDate, true,true);
	storeItem("calendars", calendars, true,true);
	storeItem("events", events, true,true);
	
	storeItem("isGoogleCalendarWebsiteLoaded",true,true);
};
//______________________________________________________________________________________________________________________

var isGoogleCalendarWebsiteLoaded = getItem("isGoogleCalendarWebsiteLoaded");
if (!isGoogleCalendarWebsiteLoaded) {
	storeGoogleCalendarData();
}
















