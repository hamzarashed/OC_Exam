function loadActiveLectureDetails() {
    var course = courseManager.getCurrentCourse();
    if (course) {
        $("#courseTitle").html(course.title);
        $("#courseDescription").html(course.description);
        if (course.currentLecture) {
            var lectureTitleFormat = $("#lectureTitle").html()
                                                      .replace("[week]", course.currentLecture.week.title)
                                                      .replace("[lecture]", course.currentLecture.title);
            $("#lectureTitle").html(lectureTitleFormat);
            $("#lectureSubject").html(course.currentLecture.topic);
            $("#lectureContent").html(course.currentLecture.htmlContent);
            var lectureResourcesContent = getLectureResourceTemplate().replace("[notes_link]", course.currentLecture.notesLink)
                                                                      .replace("[revision_link]", course.currentLecture.revisionLink);
            $("#lectureResources").html(lectureResourcesContent);
        }

    }
}

function getLectureResourceTemplate() {
    return "المصادر: <a href='[notes_link]'>ملاحظات المحاضرة</a>&nbsp;|&nbsp;<a href='[revision_link]'>أسئلة المراجعة</a>";
}

function buildLecturesHTMLContent(weeks) {
    var outlineLectures = "";

    for (index in weeks) {
        var weekLectures = getWeekLecturesTemplate();
        var week = weeks[index];
        weekLectures = weekLectures.replace("[week]", week.title);
        var lectures = "";
        for (var i = 0; i < week.lectures.length; i++) {
            var lecture = week.lectures[i];
            var lectureInfo = getLectureTemplate();
            lectureInfo = lectureInfo.replace("[date]", lecture.date)
                                     .replace("[name]", lecture.name)
                                     .replace("[week]", week.title)
                                     .replace("[id]", lecture.id);
            lectures = lectures + lectureInfo;
        }
        weekLectures = weekLectures.replace("[lectures]", lectures);
        outlineLectures = outlineLectures + weekLectures
    }
    return outlineLectures;
}

function getWeekLecturesTemplate() {

    return " \
                <h3>[week]</h3> \
                <hr color='#8D3D18' /> \
                [lectures]  \
                <br />  ";
}

function getLectureTemplate() {
    return "<dt> [date]: &nbsp;<a id='[id]' parent='[week]' onclick='setActiveLecture(this);' href='lecture.html'>[name]</a></dt>"
}


function addPost() {
    var postText = document.getElementById("postComment").value;
    if (postText) {
        try{
            var documentName = document.location.href.match(/[^\/]+$/)[0];
            var postInfo = $("#postForm").serialize();
            $.post(String.format("{0}?{1}", documentName, postInfo), null, function () { });
        }
        catch (err) {

        }

        var postTable = document.getElementById("postTable");
        var postHeader = document.getElementsByClassName("postHeader")[0];
        var htmlContent = postTextTemplate().replace("[Post_Header]", postHeader.innerHTML).replace("[Post_Text]", postText);
        var newPost = postTable.insertRow(-1);
        newPost.outerHTML = htmlContent;
        document.getElementById("postComment").value = "";
    }
}

var postTextTemplate = function () {
    return "  \
<tr> \
    <td valign='top'> \
        <h4 class='postHeader'>[Post_Header]</h4> \
        <p class='postText'>[Post_Text]</p> \
    </td> \
    <td>سالم علي قام بالرد</td> \
</tr> \
";
}

