
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
	"Mary Wilson"
	مع مراعات تكرار الاسم نفسه في هذا الملف واينما ذكر في نصوص الأسئلة
	6-<p> الرجاء المحافظه على النصوص التي تقع بين اشاره الاكبر واشاره الاصغر
	
*/

// Data Storage Manager
(function () {
    this.OnlineLearning = this.OnlineLearning || {};
    this.OnlineLearning.DataStorageManager = {
        getItem: function (name, isJsonString) {
            var item = localStorage.getItem(name);
            var itemData = null;
            if (item) {
                if (isJsonString) {
                    itemData = JSON.parse(item);
                }
                else {
                    return itemData = item;
                }
            }
            return itemData;
        },
        storeItem: function (name, value, isJsonString) {
            if (value) {
                if (isJsonString) {
                    localStorage.setItem(name, JSON.stringify(value));
                }
                else {
                    localStorage.setItem(name, value);
                }
            }
        },
        clear: function () {

        }
    }
})();

// Local Database
(function () {
    this.OnlineLearning = this.OnlineLearning || {};
    var dataStorageManager = this.OnlineLearning.DataStorageManager;
    this.OnlineLearning.LocalDB = {
        create: function () {
		// 1 الترجمة من هنا
            var courses = [
        {
            id: 1,
            title: "اللغة العربية لغير الناطقين بها",
            location: "ساعة واحدة لكل محاضرة في القاعة 201",
            description: "<p>في هذا المساق ستتم مناقشة أساسيات اللغة العربية ومخارج الحروف الصحيحة ، تشكيل الجمل الصحيحة واستخدام المفردات \
                                                     </p>"
        },
        {
            id: 2,
            title: "اللغة الإنجليزية",
            location: "ساعة لكل محاضرة في المختبر 202",
            description: "<p>الهدف من هذا المقرر هو تعليم أساسيات اللغة الإنجليزية وتشكيل جمل صحيحة وإدارة حوار ناجح </p>"
        },
        {
            id: 3,
            title: "اللغة الفرنسية",
            location: "ساعة لكل محاضرة في المختبر 102",
            description: "<p>يقدم هذا المقرر أساسيات اللغة الفرنسية وتعليم الأصوات بالإضافة إلى تركيب الجمل وتوظيف اللغة  </p>"
        }
        
            ];
		// 1 الترجمة إلى هنا
            dataStorageManager.storeItem("courses", courses, true);

			// 2 الترجمة من هنا
            var coursesLectures = [
                {
                    id: 1,
                    lectures: [
                        { title: "الأسبوع 1", lectures: [{ id: "1.1.1", date: "04/01/2016", name: "المحاضرة 1" }, { id: "1.1.2", date: "06/01/2016", name: "المحاضرة 2" }] },
                        { title: "الأسبوع 2", lectures: [{ id: "1.2.3", date: "11/01/2016", name: "المحاضرة 3" }, { id: "1.2.4", date: "12/01/2016", name: "المحاضرة 4" }, { id: "1.2.5", date: "13/01/2016", name: "المحاضرة 5" }] }
                    ]
                },
                {
                    id: 2,
                    lectures: [
                        { title: "الأسبوع 1", lectures: [{ id: "2.1.1", date: "03/01/2016", name: "المحاضرة 1" }, { id: "2.1.2", date: "04/01/2016", name: "المحاضرة 2" }, { id: "2.1.3", date: "05/01/2016", name: "المحاضرة 3" }] },
                        { title: "الأسبوع 2", lectures: [{ id: "2.2.4", date: "10/01/2016", name: "المحاضرة 4" }, { id: "2.2.5", date: "12/01/2016", name: "المحاضرة 5" }] }
                    ]
                },
                {
                    id: 3,
                    lectures: [
                        { title: "الأسبوع 1", lectures: [{ id: "3.1.1", date: "03/01/2016", name: "المحاضرة 1" }, { id: "3.1.2", date: "04/01/2016", name: "المحاضرة 2" }] },
                        { title: "الأسبوع 2", lectures: [{ id: "3.2.3", date: "05/01/2016", name: "المحاضرة 3" }, { id: "3.2.4", date: "10/01/2016", name: "المحاضرة 4" }, { id: "3.2.5", date: "12/01/2016", name: "المحاضرة 5" }] }
                    ]
                },
                {
                    id: 4,
                    lectures: [
                        { title: "الأسبوع 1", lectures: [{ id: "4.1.1", date: "05/01/2016", name: "المحاضرة 1" }, { id: "4.1.2", date: "07/01/2016", name: "المحاضرة 2" }] },
                        { title: "الأسبوع 2", lectures: [{ id: "4.2.3", date: "11/01/2016", name: "المحاضرة 3" }, { id: "4.2.4", date: "13/01/2016", name: "المحاضرة 4" }] }
                    ]
                },
                {
                    id: 5,
                    lectures: [
                        { title: "الأسبوع 1", lectures: [{ id: "5.1.1", date: "04/01/2016", name: "المحاضرة 1" }, { id: "5.1.2", date: "06/01/2016", name: "المحاضرة 2" }] },
                        { title: "الأسبوع 2", lectures: [{ id: "5.2.3", date: "11/01/2016", name: "المحاضرة 3" }, { id: "5.2.4", date: "12/01/2016", name: "المحاضرة 4" }, { id: "5.2.5", date: "13/01/2016", name: "المحاضرة 5" }] }
                    ]
                },
                {
                    id: 6,
                    lectures: [
                        { title: "الأسبوع 1", lectures: [{ id: "6.1.1", date: "03/01/2016", name: "المحاضرة 1" }, { id: "6.1.2", date: "04/01/2016", name: "المحاضرة 2" }, { id: "6.1.3", date: "05/01/2016", name: "المحاضرة 3" }] },
                        { title: "الأسبوع 2", lectures: [{ id: "6.2.4", date: "10/01/2016", name: "المحاضرة 4" }, { id: "6.2.5", date: "12/01/2016", name: "المحاضرة 5" }] }
                    ]
                },
                {
                    id: 7,
                    lectures: [
                        { title: "الأسبوع 1", lectures: [{ id: "7.1.1", date: "03/01/2016", name: "المحاضرة 1" }, { id: "7.1.2", date: "04/01/2016", name: "المحاضرة 2" }] },
                        { title: "الأسبوع 2", lectures: [{ id: "7.2.3", date: "05/01/2016", name: "المحاضرة 3" }, { id: "7.2.4", date: "10/01/2016", name: "المحاضرة 4" }, { id: "7.2.5", date: "12/01/2016", name: "المحاضرة 5" }] }
                    ]
                },
                {
                    id: 8,
                    lectures: [
                        { title: "الأسبوع 1", lectures: [{ id: "8.1.1", date: "05/01/2016", name: "المحاضرة 1" }, { id: "8.1.2", date: "07/01/2016", name: "المحاضرة 2" }] },
                        { title: "الأسبوع 2", lectures: [{ id: "8.2.3", date: "11/01/2016", name: "المحاضرة 3" }, { id: "8.2.4", date: "13/01/2016", name: "المحاضرة 4" }] }
                    ]
                }

            ];
			// 2 الترجمة إلى هنا
            dataStorageManager.storeItem("courseLectures", coursesLectures, true);

			// 3 الترجمة من هنا
            var lecturesDetails = [
                {
                    id: "1.1.1",
                    title: "المحاضرة 1",
                    topic: "المقدمة",
                    htmlContent: "<p>تعريف مبسط للغة العربية وأصولها والبدء بالأصوات ومخارج الحروف وتشكيل الكلمات.</p>",
                    notesLink: "المقدمة.docx",
                    revisionLink: "مراجعة المقدمة.docx"
                },
                {
                    id: "1.1.2",
                    title: "المحاضرة 2",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "1.2.3",
                    title: "المحاضرة 3",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "1.2.4",
                    title: "المحاضرة 4",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "1.2.5",
                    title: "المحاضرة 5",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "2.1.1",
                    title: "المحاضرة 1",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "2.1.2",
                    title: "المحاضرة 2",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "2.1.3",
                    title: "المحاضرة 3",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "2.2.4",
                    title: "المحاضرة 4",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "2.2.5",
                    title: "المحاضرة 5",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "3.1.1",
                    title: "المحاضرة 1",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: "أسئلة_المراجعة.docx"
                },
                {
                    id: "3.1.2",
                    title: "المحاضرة 2",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "3.2.3",
                    title: "المحاضرة 3",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "3.2.4",
                    title: "المحاضرة 4",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "3.2.5",
                    title: "المحاضرة 5",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "4.1.1",
                    title: "المحاضرة 1",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "4.1.2",
                    title: "المحاضرة 2",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "4.2.3",
                    title: "المحاضرة 3",
                    topic: "لغة الاستعلامات المركبة (SQL)",
                    htmlContent: "<p>تعريف لغة الاستعلامات المركبة (SQL)؟ كيف يمكن الوصول إلى قاعدة البيانات ومعالجتها باستخدام SQL؟</p>\
                          <p>معرفة الفرق بين لغة تعريف البيانات (DDL) ولغة معالجة البيانات (DML)</p>",
                    notesLink: "SQL.docx",
                    revisionLink: "مراجعة لغة الاستعلامات.docx"
                },
                {
                    id: "4.2.4",
                    title: "المحاضرة 4",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "5.1.1",
                    title: "المحاضرة 1",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "5.1.2",
                    title: "المحاضرة 2",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "5.2.3",
                    title: "المحاضرة 3",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "5.2.4",
                    title: "المحاضرة 4",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "5.2.5",
                    title: "المحاضرة 5",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "6.1.1",
                    title: "المحاضرة 1",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "6.1.2",
                    title: "المحاضرة 2",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "6.1.3",
                    title: "المحاضرة 3",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "6.2.4",
                    title: "المحاضرة 4",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "6.2.5",
                    title: "المحاضرة 5",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "7.1.1",
                    title: "المحاضرة 1",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "7.1.2",
                    title: "المحاضرة 2",
                    topic: "تحويل الصورة",
                    htmlContent: "<p>تحويل الصورة هي مجموعة من العمليات الحسابية البسيطة أو المعقدة التي يتم تطبيقها على صورة لتحويلها إلى صورة ذات دلالة أخرى.</p> \
                          <p>عمليات معالجة الصور: الانعكاس، والسطوع، والتباين، والقلب، والتدوير، والاقتصاص، والتصغير والتكبير، والتشويه.</p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "7.2.3",
                    title: "المحاضرة 3",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "7.2.4",
                    title: "المحاضرة 4",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "7.2.5",
                    title: "المحاضرة 5",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "8.1.1",
                    title: "المحاضرة 1",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "8.1.2",
                    title: "المحاضرة 2",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "8.2.3",
                    title: "المحاضرة 3",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
                {
                    id: "8.2.4",
                    title: "المحاضرة 4",
                    topic: "",
                    htmlContent: "<p></p> \
                          <p></p>",
                    notesLink: "",
                    revisionLink: ""
                },
            ];
			//3 الترجمة إلى هنا
            dataStorageManager.storeItem("lectureDetails", lecturesDetails, true);
        }
    }
})();

//Courses Manager
(function () {
    this.OnlineLearning = this.OnlineLearning || {};
    var dataStorageManager = this.OnlineLearning.DataStorageManager;
    var currentCourseStoreKey = "currentSelectedCourse";
    var lecturePageUrl = "lecture.html";

    this.OnlineLearning.CourseManager = {
        initCourse: function () {
            var emptyCourse =
            {
                id: 0,
                title: "",
                location: "",
                description: "",
                currentLecture: {
                    id: 0,
                    title: "",
                    topic: "",
                    htmlContent: "",
                    revisionLink: "",
                    notesLink: "",
                    week: { title: "" }
                }
            };

            return emptyCourse;
        },
        getCurrentCourse: function () {
            var course = dataStorageManager.getItem(currentCourseStoreKey, true);
            if (!course) {
                course = this.initCourse();
            }
            return course;
        },
        setCurrentCourse: function (course) {
            dataStorageManager.storeItem(currentCourseStoreKey, course, true);
        },
        updateCurrentCourseByTitle: function (courseTitle) {
            var course = this.getCurrentCourse();
            if (course.title !== courseTitle) {

                var dbCourse = this.getDBCourseByTitle(courseTitle);
                course.title = courseTitle;
                course.id = dbCourse.id;
                course.location = dbCourse.location;
                course.description = dbCourse.description;

                this.setCurrentCourse(course);
            }
        },
        fireCourseLectureContentIsAccessed: function () {
            var currentCourse = this.getCurrentCourse();
            var lectureInfo = {
                courseTitle: currentCourse.title,
                lectureTitle: currentCourse.currentLecture.title,
                lectureTopic: currentCourse.currentLecture.topic
            };
            $.post(String.format("{0}?{1}", lecturePageUrl, $.param(lectureInfo)), null);
        },
        getDBCourseByTitle: function (courseTitle) {
            var dbCourses = dataStorageManager.getItem("courses", true);
            for (courseIndx in dbCourses) {
                var course = dbCourses[courseIndx];
                if (course.title === courseTitle) {
                    return course;
                }
            }
        },
        getDBCourseLecturesByCourseID: function (courseId) {
            var coursesLectures = dataStorageManager.getItem("courseLectures", true);
            return coursesLectures[courseId - 1].lectures;
        },
        getDBLectureByLectureID: function (lectureId) {
            var dbLectures = dataStorageManager.getItem("lectureDetails", true);
            for (lectureIndx in dbLectures) {
                var lecture = dbLectures[lectureIndx];
                if (lecture.id === lectureId) {
                    return lecture;
                }
            }
            return null;
        },
        setCurrentCourseLastAccessedLecture: function (lectureId, weekTitle) {
            var lecture = this.getDBLectureByLectureID(lectureId);
            var course = this.getCurrentCourse();

            course.currentLecture.id = lecture.id;
            course.currentLecture.title = lecture.title;
            course.currentLecture.topic = lecture.topic;
            course.currentLecture.week = course.currentLecture.week || {};
            course.currentLecture.week.title = weekTitle;
            course.currentLecture.revisionLink = lecture.revisionLink;
            course.currentLecture.notesLink = lecture.notesLink;
            course.currentLecture.htmlContent = lecture.htmlContent;

            this.setCurrentCourse(course);

        }
    }

})();



