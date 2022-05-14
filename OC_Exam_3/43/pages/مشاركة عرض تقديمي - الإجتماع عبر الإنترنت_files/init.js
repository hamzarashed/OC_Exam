/*
	قواعد ترجمة هذا الملف:
	1- اسماء الاعلام يجب توافقها عند التعديل اينما وجدت في الملف
	2- تعديل اسماء الاعلام اي الاشخاص او البريد الالكتروني يتطلب ربطه بنص الأسئلة
	3- عدم ترجمة النصوص التي تحتوي على صور مثل:
	../img/leadership.jpg
	4- تبدأ فقرا ت الترجمة برقم ثم جملة من هنا، أي
	//1 من هنا
	وتنتهي بنفس الرقم ومن ثم إلى هنا، أي
	//1 إلى هنا
	5- ترجم ما بين ""
	مثال
	"ماريا وليد"
	مع مراعات تكرار الاسم نفسه في هذا الملف واينما ذكر في نصوص الأسئلة
	
*/
(function () {
	this.OnlineMeeting = this.OnlineMeeting || {};
	this.OnlineMeeting.currentMeeting = {
		id: 1,
		slideSnapshot: "../img/marketing_plan.jpg",
		sharedSlide: "../img/marketing_plan_slides.jpg",
		documentSnapshot: "",
		sharedDocument: "",
		webSnapshot: "",
		sharedWeb: "",
		// 1 الترجمة من هنا
		المشاركون: [
						{ name: "أنت (المقدم)", status: 1, },
						{ name: "فرح أحمد", status: 1, gender: 2 },
						{ name: "أنس حسين", status: 0 },
						{ name: "هبة مؤمن", status: 1 },
						{ name: "رنا يونس ", status: 1, gender: 2 },
						{ name: "سناء يوسف", status: 0, gender: 2 }],
		chatUsers: ["جميع الحضور", "فرح أحمد", "أنس حسين", "هبة مؤمن", "رنا يونس", "سناء يوسف", "وليد خلدون", "سامية الأسعد"],
		meetings: [
			{ meetingTopic: "مناقشة خطة مشروع بناء المصنع", meetingStartDate: "12", meetingStartMonth: "أيلول", meetingStartHour: "11", meetingStartMinutes: "00", meetingInvitees: "" },
			{ meetingTopic: "تقييم أداء العمال", meetingStartDate: "07", meetingStartMonth: "شباط", meetingStartHour: "08", meetingStartMinutes: "30", meetingInvitees: "جيهان آدم, جميل باسل, أنت (المقدم)" },
			{ meetingTopic: "تقييم سير العمل", meetingStartDate: "26", meetingStartMonth: "آب", meetingStartHour: "09", meetingStartMinutes: "30", meetingInvitees: "تامر رائد, ماريا وليد" },
			{ meetingTopic: "مراجعة أساليب العمل وتطويرها", meetingStartDate: "20", meetingStartMonth: "تموز", meetingStartHour: "15", meetingStartMinutes: "00", meetingInvitees: "" }
		// 1 الترجمة إلى هنا
		]
	}
})();