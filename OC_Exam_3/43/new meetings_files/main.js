

function FindLeftWindowboundary() {
    // In Internet Explorer window.screenLeft is the window's left boundary
    if (window.screenLeft) {
        return window.screenLeft;
    }

    // In Firefox window.screenX is the window's left boundary
    if (window.screenX)
        return window.screenX;

    return 0;
}
// Find Left boundary of current Window
function FindTopWindowboundary() {
    // In Internet Explorer window.screenLeft is the window's left boundary
    if (window.screenTop) {
        return window.screenTop;
    }

    // In Firefox window.screenY is the window's left boundary
    if (window.screenY)
        return window.screenY;

    return 0;
}
var meetingDialog = null
function startMeeting() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var x = 200;
    var y = 50;
    var startMeetingUrl = getCurrentPagePath("start_meeting.html");
    meetingDialog = window.open(startMeetingUrl, 'sharegplus', 'modal=yes,height=' + (height - (y * 2)) + ',width=' + (width - (x * 2)) + ',left=' + x + ',top=' + y);
}

function getCurrentPagePath(pageName) {
    var path = document.location.pathname;
    var match = document.location.pathname.match(/[^\/]+$/);
    var isIndexPage = false;
    if (match) {
        var currentPage = match[0];
        if (currentPage.match("index")) {
            isIndexPage = true;
        }
    }
    else {
        isIndexPage = true;
    }

    if (isIndexPage) {
        return String.format("./pages/{0}", pageName);
    }
    else {
        return path.replace(/[^\/]+$/, pageName);
    }
    return pageName;
}

function IsIndexPage() {
    var match = document.location.pathname.match(/[^\/]+$/);
    var isIndexPage = false;
    if (match) {
        var currentPage = match[0];
        if (currentPage.match("index")) {
            isIndexPage = true;
        }
    }
    else {
        isIndexPage = true;
    }

    return isIndexPage;
}

function getResourceActualPath(resourcePath) {
    var path = resourcePath.substring(resourcePath.indexOf("/"));

    //if (path.startsWith("/"))
    //{
    //    path = path.substring(1, path.length);
    //}
    return IsIndexPage() ? path : String.format("../{0}", path);

}

function closeMeetingDialog() {
    if (meetingDialog && meetingDialog.closed == false) {
        meetingDialog.close();
    }
}

var sharePresentationDialog = null;
function sharePresentation() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var x = 200;
    var y = 50;
    var sharePresentationUrl = getCurrentPagePath("share_presentation.html");
    sharePresentationDialog = window.open(sharePresentationUrl, 'popup', 'modal=yes,height=' + (height - (y * 2)) + ',width=' + (width - (x * 2)) + ',left=' + x + ',top=' + y);
}

var shareDesktopDialog = null;
function shareDesktop() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var x = 200;
    var y = 50;
    var shareDesktopUrl = getCurrentPagePath("share_desktop.html");
    shareDesktopDialog = window.open(shareDesktopUrl, 'sharegplus', 'loaction=no,titlebar=no,modal=yes,height=' + (height - (y * 2)) + ',width=' + (width - (x * 2)) + ',left=' + x + ',top=' + y);

}

function navigateToNewMeetingPage() {
    window.location.href = getCurrentPagePath("new_meeting.html");
}

function navigateToMeetingsPage() {
    window.location.href = getCurrentPagePath("all_meetings.html");
}

String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
};

document.getName = function () {
    var match = document.location.href.match(/[^\/]+$/);
    if (match) {
        return document.location.href.match(/[^\/]+$/)[0];
    }
    return "index.html";
};

function loadMeetingList() {
    var meetingManager = this.OnlineMeeting.MeetingManager;
    var meetings = meetingManager.getAllMeetings();
    var dataManager = this.OnlineMeeting.dataManager;
    $("#meetingList tr:not(:first)").remove();
    for (var index in meetings) {
        var meeting = meetings[index];
        var meetingTemplate = this.OnlineMeeting.templateManager.meetingItem;
        meetingTemplate = meetingTemplate.replace("[title]", fixTextDecode(meeting.meetingTopic))
                                         .replace("[date]", String.format("{0} {1}", meeting.meetingStartDate, fixTextDecode(meeting.meetingStartMonth)))
                                         .replace("[time]", String.format("{0}:{1}", meeting.meetingStartHour, meeting.meetingStartMinutes));
        $("#meetingList").append(meetingTemplate);
    }

    $(".editMeeting").click(function () {
        var topic = $(this).closest('td').parent().children("[name='meetingTitle']").text();
        editMeeting(topic);
    });
    $(".cancelMeeting").click(function () {
        var topic = $(this).closest('td').parent().children("[name='meetingTitle']").text();
        dataManager.postCancelledMeetingInfo(topic);
        deleteMeeting(topic);
    });
}

function deleteMeeting(meetingTopic) {
    this.OnlineMeeting.MeetingManager.removeMeeting(meetingTopic);
    loadMeetingList();
}

function editMeeting(meetingTopic) {
    this.OnlineMeeting.MeetingManager.storeLastModifiedMeeting(meetingTopic);
    window.location.href = getCurrentPagePath("edit_meeting.html");
}


parseParams = function (query) {
    var obj = {};
    query.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function ($0, $1, $2, $3) { obj[$1] = $3; }
    );
    return obj;
};

fixTextDecode = function (text) {
    text = decodeURIComponent(text); 
    return text.replace(/[+]/g, " ");
};

(function () {
    this.OnlineMeeting = this.OnlineMeeting || {};
    this.OnlineMeeting.templateManager = {
        meetingParticipant: "\
                                <td style='width:20%'><img src='{0}' /></td> \
                                <td>{1}</td> \
                                <td style='width:5%; vertical-align:middle'><img src='{2}' /></td> \
                                <td style='width:20%'>{3}</td> \
                              ",
        meetingItem: "\
                <tr> \
                    <td name='meetingTitle' align='center'>[title]</td>\
                    <td align='center'>[date]</td>\
                    <td align='center'>[time]</td>\
                    <td align='center'>\
                        <input class='buttonStyle editMeeting' type='button' id='edit' value='تحرير'>\
                        <input class='buttonStyle cancelMeeting' type='button' id='cancel' value='حذف'>\
                    </td>\
                </tr>\
                        \
"
    }

})();

(function () {

    var currentMeeting = this.OnlineMeeting.currentMeeting;
    var templateManager = this.OnlineMeeting.templateManager;
    var meetingManager = this.OnlineMeeting.MeetingManager;

    var newMeetingUrl = getCurrentPagePath("new_meeting.html");
    var allMeetingsUrl = getCurrentPagePath("all_meetings.html");
    var editMeetingUrl = getCurrentPagePath("edit_meeting.html");

    this.OnlineMeeting.dataManager = {
        populateChatUsersList: function () {
            var chatUsers = currentMeeting.chatUsers;
            $.each(chatUsers, function (index, item) {
                if (item && item != "") {
                    $('<option></option')
                            .attr('value', item)
                            .text(item)
                            .appendTo($("#chatTo"));
                }

            });
        },
        setPresentationBackground: function () {
            $(".snapshot").attr("src", getResourceActualPath(currentMeeting.slideSnapshot));
        },
        populateMeetingAttendeesList: function () {
            var meetingParticipants = currentMeeting.participants;
            if (meetingParticipants != null) {
                var participantTable = $("#meetingParticipants");
                participantTable.empty();
                $.each(meetingParticipants, function (index, item) {

                    var pictureUrl = getResourceActualPath(item && item.gender == 2 ? "../img/female_user.png" : "../img/male_user.png");
                    var statusrl = getResourceActualPath(item && item.status ? "../img/online.png" : "../img/offline.png");

                    var participant = String.format(templateManager.meetingParticipant, pictureUrl, item.name, statusrl, item.status ? "Online" : "Offline");
                    $('<tr></tr>').html(participant)
                                  .appendTo(participantTable);
                });
            }
        },
        postNewCreatedMeetingInfo: function () {
            var meetingForm = $("#meeting_form");
            var meetingInfo = meetingForm.serialize();
            meetingManager.addMeeting(parseParams(meetingInfo));

            $.post(String.format("{0}?{1}", newMeetingUrl, meetingInfo), null);
            window.location.href = allMeetingsUrl;

        },
        postModifiedMeetingInfo: function (meetingTopic) {
            var meeting = meetingManager.findMeetingByTopic(meetingTopic);
            if (meeting) {
                $.post(String.format("{0}?{1}", editMeetingUrl, $.param(meeting)), null);
                window.location.href = allMeetingsUrl;
            }
        },
        postCancelledMeetingInfo: function (meetingTopic) {
            var meeting = meetingManager.findMeetingByTopic(meetingTopic);
            if (meeting) {
                meeting.cancelled = true;

                $.post(String.format("{0}?{1}", allMeetingsUrl, $.param(meeting)), null);
                window.location.href = allMeetingsUrl;
            }
        },
        sendChatMessage: function () {
            var chatForm = $("#chatForm");
            var chatInfo = chatForm.serialize();
            var currentPageName = document.getName();

            $.post(String.format("{0}?{1}", currentPageName, chatInfo), null);
            chatForm[0].reset();
        }

    }
})();