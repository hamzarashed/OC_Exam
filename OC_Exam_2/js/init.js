	/*
	قواعد ترجمة هذا الملف:
1- اسماء الاعلام يجب توافقها عند التعديل اينما وجدت في الملف
2- تعديل اسماء الاعلام اي الاشخاص او البريد الالكتروني يتطلب ربطه بنص الأسئلة
3- عدم ترجمة التالي
	postType: "status"
4- تبدأ فقرا ت الترجمة برقم ثم جملة من هنا، أي
//1 من هنا
وتنتهي بنفس الرقم ومن ثم إلى هنا، أي
//1 إلى هنا
5- ترجم ما بين ""
مثال
"مازن جميل"
مع مراعات تكرار الاسم نفسه في هذا الملف واينما ذكر في نصوص الأسئلة
	*/
var storeSocialMediaData = function () {

	//-----------------------------------------------------
	//***************** My Profile Info *****************//
	//1 من هنا
	var profileName = "سالم حجار";
	//1 الى هنا
	
	var covorImage = "../img/covor-image-fisherman.jpg";
	var profileImage = "../img/profile-image-m-roberto.jpg";
	
	//1 من هنا
	var about = "مدقق حسابات في شركة تدقيق حسابات<br /><br />درس في جامعة تونس<br /><br />يسكن في عمان<br /><br />متزوج<br />";
	//1 الى هنا
	
	var photos = [
		"../img/covor-image-mountaineer.jpg", 
		"../img/covor-image-fisherman.jpg", 
		"../img/covor-image-log.jpg", 
		"../img/covor-image-train.jpg", 
	];
	
	var likes = [ { name: "الحلويات", src: "../img/like-image-sweet.jpg" } ];

	//1 من هنا
	// ترجمة فقط أسماء الأشخاص, عدم ترجمة أسماء الصور	
	var friends = [
		{ name: "علاء محمد", src: "../img/profile-image-fantasy-girl.jpg" }, 
		{ name: "نضال حرب", src: "../img/profile-image-il.jpg" }, 
		{ name: "هند علي", src: "../img/profile-image-suitcase.jpg" }, 
		{ name: "ماهر مسعود", src: "../img/profile-image-m-john-d.jpg" }, 
		{ name: "روان الأسمر", src: "../img/profile-image-person1.jpg" },
		{ name: "هاني مسعود", src: "../img/profile-image-man.jpg" }
	];
	//1 الى هنا
	
	/*
	posts = [
				{ 
					name: "", postText: "", 
					postType: "status/hyperlink", (By Default the post type is setted to status)
					comments: [ { name: "", commentText: "" } ], 
					sharedFrom: "frinedName" // This key is optional, if I shared a post from a friend/page/group //
					isSharedToMe: true,       // This key is optional, if my friend shared a post (to me / on my profile) //
					isLike: true,
				}
			];
	*/
	
	//1 من هنا
	// عدم ترجمة كلمة : "status"
	var posts = [ 
					{ name: "نضال حرب", postText: "ماليزيا هي الأفضل ، إنني في الجنة !", 
						postType: "status"
					},
					{ name: "سالم حجار", postText: "سأنظم رحلة في بداية هذا الشهر ، من سينضم؟", 
						postType: "status"
					},  
					{ name: "هاني مسعود", postText: "هل لديك أي كتب مقترحة للقراءة؟", 
						postType: "status", 
						comments: 
							[ 
								{ name: "سالم حجار", commentText: "لقد انتهيت للتو من قراءة كتاب الخيميائي " }, 
								{ name: "هاني مسعود", commentText: "للكاتب باولو كويللو ؟ " },
								{ name: "سالم حجار", commentText: "صحيح" },
								{ name: "هاني مسعود", commentText: "لقد سمعت الكثير عنه ، سأبدأ بقراءته حالاً ..." },
							] 
					}, 
					{ name: "سالم حجار", postText: "القراءة مفتاح النجاح", postType: "status" }
			    ];
	//1 الى هنا
	
	//-----------------------------------------------------
	//***************** Home Page Info ******************//
	
	// friendsPosts = { friendName: [ posts ], friendName: [ posts ], ...... }
	// this object contains the friends posts on their profiles, we need this object to show the friends posts on the home page.
	// each friend [ posts ] is the same as my posts.
	
	//1 من هنا
	// عدم ترجمة كلمة : "status"
	var friendsPosts = { 
		"جهاد عبود": 
		[ 
			{ name: "جهاد عبود", postText: "كلكم مدعوون لحفلة عيد ميلادي", postType: "status" }
		], 
		"مازن جميل": 
		[ 
			{ name: "سالم حجار", postText: "سأنظم رحلة في بداية هذا الشهر ، من سينضم ؟", postType: "status", 
				comments: 
					[ 
						{ name: "رائد فريد", commentText: "أعتقد إنني سأتمكن من الحضور" }, 
						{ name: "سالم حجار", commentText: "حاول أن تكون معنا" }, 
						{ name: "نائل سفيان", commentText: "أنا سأنضم بالتأكيد" }
					]
			}
		], 
		"سارة جابر": 
		[
			{ name: "سارة جابر", postText: "كيف يمكنني استعادة جهات الاتصال من هاتفي المكسور؟ أرجو إرسال أرقامكم الخاصة على بريدي الإلكتروني في حال لم تنجح عملية الإصلاح:(", postType: "status" },
		], 
		"آدم لؤي": 
		[
			{ name: "آدم لؤي", postText: "السفر يعيد لك القوة والمحبة في حياتك", postType: "status", 
				comments: 
				  	[
				  		{ name: "مازن جميل", commentText: "السفر هو الشيء الوحيد الذي تشتريه ويجعلك أغنى!" }, 
				  		{ name: "آدم لؤي", commentText: "فعلاً!" }
				  	]
			} 
		]
	};
	//1 الى هنا
	//-----------------------------------------------------
    //*************** Friends Profile Info ***************//
	//1 من هنا
	var friendAbout = "مطور<br /><br />يدرس في الجامعة العربية<br /><br />يسكن في بيروت<br /><br />أعزب<br />";
	//1 الى هنا
	
	var friendPhotos = [
		"../img/covor-image-mountaineer.jpg",
		"../img/covor-image-train.jpg"
	];
	
	var friendLikes = [];
	
	//-----------------------------------------------------
    //*************** Friends Profile Info ***************//
	//1 من هنا
	var settings = { 
		privacy: { canRead: "الأصدقاء", canWrite: "الأصدقاء", canInviteMe: "الأصدقاء of الأصدقاء" }
	};
	//1 الى هنا
	//_____________________________________________________	
	storeItem("profileName", profileName);
	storeItem("covorImage", covorImage);
	storeItem("profileImage", profileImage);
	storeItem("about", about);
	storeItem("photos", photos, true);
	storeItem("likes", likes, true);
	storeItem("friends", friends, true);
	storeItem("posts", posts, true);
	storeItem("friendsPosts", friendsPosts, true);
	storeItem("friendAbout", friendAbout);
	storeItem("friendPhotos", friendPhotos, true);
	storeItem("friendLikes", friendLikes, true);
	storeItem("settings", settings, true);
	
	storeItem("isSocialMediaWebsiteLoaded", true);
};
//______________________________________________________________________________________________________________________

var isSocialMediaWebsiteLoaded = getItem("isSocialMediaWebsiteLoaded");
if (!isSocialMediaWebsiteLoaded) {
	storeSocialMediaData();
}
























