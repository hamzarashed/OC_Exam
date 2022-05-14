// Data Storage Manager
(function () {
    this.OnlineMeeting = this.OnlineMeeting || {};
    this.OnlineMeeting.DataStorageManager = {
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

// Meeting Manager
(function () {
    var dataStorageManager = this.OnlineMeeting.DataStorageManager;
    var currentSession = this.OnlineMeeting.currentMeeting;

    var allMeetingKeyStore = "allMeetings";

    this.OnlineMeeting.MeetingManager = {
        init: function () {
            if (dataStorageManager.getItem(allMeetingKeyStore) === null) {
                dataStorageManager.storeItem(allMeetingKeyStore, currentSession.meetings, true);
            }
        },
        addMeeting: function (meeting) {
            var allMeetings = this.getAllMeetings();
            if(!allMeetings)
            {
                allMeetings = currentSession.meetings;
            }
            allMeetings.unshift(meeting);
            dataStorageManager.storeItem(allMeetingKeyStore, allMeetings, true);
        },
        getAllMeetings: function () {
            return dataStorageManager.getItem(allMeetingKeyStore, true);
        },
        findMeetingByTopic: function (topic) {
            var meetings = this.getAllMeetings();
            var index = this.findMeetingIndex(topic);
            if (index > -1)
            {
                return meetings[index];
            }
            return null;
        },
        findMeetingIndex: function (topic) {
            var meetings = this.getAllMeetings();
            if (meetings) {
                for (var index in meetings) {
                    var meeting = meetings[index];
                    if (meeting.meetingTopic.toLowerCase() === topic.toLowerCase()) {
                        return index;
                    }
                }
            }
            return -1;
        },
        removeMeeting: function (topic) {
            var meetings = this.getAllMeetings();
            var index = this.findMeetingIndex(topic);
            console.log(index)
            if (index > -1) {
                meetings.splice(index, 1);
            }
            dataStorageManager.storeItem(allMeetingKeyStore, meetings, true);
        },
        editMeeting: function(meeting){
            this.removeMeeting(meeting.meetingTopic);
            this.addMeeting(meeting);
        },
        storeLastModifiedMeeting: function (topic) {
            var meeting = this.findMeetingByTopic(topic);
            if (meeting) {
                dataStorageManager.storeItem("lastModifiedMeeting", meeting, true);
            }
        },
        obtainLastModifiedMeeting: function (topic) {
            return dataStorageManager.getItem("lastModifiedMeeting", true);
        }
    }
})();